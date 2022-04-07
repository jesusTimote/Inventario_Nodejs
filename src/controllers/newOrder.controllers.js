const PDFDocument = require("pdfkit-construct")
const fs = require('fs');

const newOrder={}

const { json } = require('express')
const pool=require('../database/bd')


newOrder.crearPedido=async(req,res) => {
    const ListaProveedor =await pool.query("SELECT * from proveedor ")
    const ListaProductoDetalle =await pool.query("SELECT codigo,producto,marca,fabricante,pre_venta FROM productos")
    res.render("NewOrder/newOrder",{ListaProveedor,ListaProductoDetalle})

}

newOrder.agregarProveedor=(req, res)=>{
    
    const {codigo,proveedor,dni,ruc,correo,telefono,estado}=req.body
        const datos={
            codigo,
            proveedor,
            dni,
            ruc,
            correo,
            telefono,
            estado
        }
        
        pool.query("Insert into proveedor SET ?",[datos])

        res.redirect("/views/new-Order/")
}
/* OPCION 1 CON DATATABLE =>LO CAMBIAA OPCION 2 - crearPedido
    POR QUE NO PUEDO PONER ID ALOS TD
newOrder.ListarProductoDetalle=async(req, res)=>{
  await pool.query("SELECT codigo,producto,marca,fabricante,pre_venta FROM productos", (error, result) => {
    if (error) throw error

    const data = JSON.stringify(result)
    res.send(data)
})

}
*/
newOrder.agregaProducto=(req, res)=>{
    
    const {proveedor,fecha,comprobante,Ncompra} = req.body
   const datos={
    proveedor_codigo:proveedor,
    fecha,
    tipoComprobante:comprobante,
    numeroComprobante:Ncompra,

   }
   //pool.query("Insert into detalleproducto set ?",[datos])

    
    res.redirect("/views/new-Order/")
}


newOrder.reportsPedido=async(req, res)=>{
    const {proveedor,fecha,comprobante,Ncompra} = req.body
    const datos={
     proveedor_codigo:proveedor,
     fecha,
     tipoComprobante:comprobante,
     numeroComprobante:Ncompra,
 
    }


  // Create a document
  const doc = new PDFDocument({bufferPage:true}); 
  const filenames =`Factura${Date.now()}.pdf`
  
  const stream = res.writeHead(200,{
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${filenames}`
  })
  doc.on("data", (data)=>{stream.write(data)});
  doc.on("data", ()=>{stream.end()});

  const products=[{
    CODIGO:"PRO0003",
    CANTIDAD:2,
    DESCIPCION:"MONITOR", 
    PRECIO:15.25,
    TOTAL:30.50
},
{
    CODIGO:"PRO0003",
    CANTIDAD:2,
    DESCIPCION:"MONITOR", 
    PRECIO:15.25,
    TOTAL:30.50
}
]

   // set the header to render in every page
   doc.setDocumentHeader({height:240}, () => {
    doc.image('logo.png',10,10,{width:120})
    .fillColor('#444444')
    .fontSize(20)
    .text('Inventary Inc.', 110, 57)
    .fontSize(10)
    .text('Av. Juan Pablo N° 1536', 200, 65, { align: 'right' })
    .text('Trujillo - Peru ', 200, 80, { align: 'right' })
    .moveDown();

    doc.fontSize(15)
    .text(`${datos.tipoComprobante} de Venta`,{ align: 'center', width: 200 })

    doc.fontSize(12)
    doc.text(`Proveedor : ${datos.proveedor_codigo}`, 115,150)
    .text(`Fecha : ${datos.fecha}`, 115,170)
    .text(`N°Compra : ${datos.numeroComprobante}`, 115,190)
});

  
  doc.addTable(
    [
        {key: 'CODIGO', label: 'CODIGO'},
        {key: 'CANTIDAD', label: 'CANTIDAD'},
        {key: 'DESCIPCION', label: 'DESCIPCION'},
        {key: 'PRECIO', label: 'PRECIO'},
        {key: 'TOTAL', label: 'TOTAL', align: 'right'}
    ],  products, {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#d6c4dd"],
        cellsPadding: 10,
        marginLeft: 45,
        marginRight: 45,
        headAlign: 'center'
    });
    
    
        // render tables
        doc.render();



    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.end();
}


module.exports =newOrder;