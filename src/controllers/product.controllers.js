const PDFDocument = require("pdfkit-construct")
const fs = require('fs');
const barcode = require('barcode');

//creamos el objeto para todos los metodos
const productController = {};
//importamos la base de datos 
const pool = require('../database/bd')


// URL=>/views/new-Product/
productController.viewProducts = (req, res) => {
    res.render('Product/newProduct', {
        titulo: "PRODUCTO",
        descripcion: "Detalle Producto"
    })
}
// URL=>/views/view-Product/
productController.viewAddProduct = (req, res) => {
    res.render('Product/addProduct', {
        titulo: "PRODUCTO",
        descripcion: "Registro Producto"
    })
}

// URL=>/views/add-Product/
productController.addProducts = (req, res) => {
    
    console.log("file",req.file);
    const { codigo, cod_barras, producto, marca, descripcion, fabricante, estado, pre_compra, pre_venta, stck_minimo, stock } = req.body
    const image="/img/product/"+req.file.filename
    const datos = { 
        codigo, cod_barras, 
        producto, marca, 
        descripcion, fabricante, 
        estado, pre_compra, 
        pre_venta, stck_minimo, 
        stock,image
    }
    console.log("Insertar",datos);
   pool.query("INSERT INTO productos set ?",[datos])
   
    res.redirect("/views/view-Product/")
}


// URL=>/views/edit-Product/
productController.editProducts = async(req, res) => {
    
  const {id}=req.params
  
  const edit = await pool.query("SELECT * FROM productos WHERE codigo =?",[id])
    res.render('Product/editProduct', {
        titulo: "PRODUCTO",
        descripcion: "Editar Producto",
        editar:edit[0]
    })
    

   

}
// URL=>/views/edit-Product/
productController.UpdateProducts = async(req, res) => {
    
    const {id}=req.params
    
    const { codigo, cod_barras, producto, marca, descripcion, fabricante, estado, pre_compra, pre_venta, stck_minimo, stock } = req.body
    const image="/img/product/"+req.file.filename
    const datos = { 
        codigo, cod_barras, 
        producto, marca, 
        descripcion, fabricante, 
        estado, pre_compra, 
        pre_venta, stck_minimo, 
        stock,image
    }
    
     await pool.query("UPDATE productos set ? WHERE codigo=?",[datos,id])
     
     res.redirect("/views/view-Product/")

  }

  productController.deleteProducts = async(req, res) => {
    
    const {id}=req.params
   
     await pool.query("delete from productos WHERE codigo=?",[id])
     res.redirect("/views/new-Product/")
   

  }
/** LISTAR COMBO **/


/** LISTAR DATOS PRODUCTO **/

productController.ListarProducto = (req,res)=>{

    pool.query("SELECT codigo,producto,marca,stck_minimo,stock,estado,pre_compra,pre_venta FROM productos", (error, result) => {
        if (error) throw error

        const data = JSON.stringify(result)
        res.send(data)
    })

}
productController.GenerarCodigoBarra=(req,res)=>{
    // Create a document
    const producto=req.body.txtCodigoBarraP
    const cantidad=req.body.txtCant
    
    // const codBarra=await pool.query("select cod_barras ,producto from productos where codigo=?",[id])
     
  //res.render("Product/codBarras",{codBarra,layout:""})
      
    const doc = new PDFDocument({bufferPage:true}); 
    const filenames =`CodBarra${Date.now()}.pdf`
    
    const stream = res.writeHead(200,{
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${filenames}`
    })
    doc.on("data", (data)=>{stream.write(data)});
    doc.on("data", ()=>{stream.end()});
      
    for (let i = 0; i <= cantidad; i++) {  
        const  codigo=__dirname+ "/../public/LibreBarcode39-Regular.ttf"
        doc.font(codigo).fontSize(50).text(`${producto}`);
    }
    
    doc.pipe(fs.createWriteStream('CodBarra.pdf'));
    doc.end();
  
    
  }


module.exports = productController;




