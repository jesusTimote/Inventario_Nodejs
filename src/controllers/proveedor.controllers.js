//creamos el objeto para todos los metodos
const  controllerProveedor = {};
//importamos la base de datos 
const pool = require('../database/bd')
//creamos el metodo listar con el objeto creado

controllerProveedor.vistaProveedor=(req, res) => {
    
    res.render('Proveedor/proveedor',{
        titulo:"Proveedor",
        descripcion:"Detalle Proveedor"
    })
}

controllerProveedor.agregarProveedor=(req, res)=>{
    
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

        res.redirect("/views/proveedor")
}

controllerProveedor.listarProveedor=(req, res) => {

    pool.query("Select * from proveedor", (error, result) => {
        if (error) throw error

        const data = JSON.stringify(result)
        res.send(data)
    })
}


controllerProveedor.editarProveedor=async(req, res) => {
    const {codigo}=req.body
    const data={proveedor,dni,ruc,correo,telefono,estado} = req.body
   
    await pool.query("UPDATE proveedor set ? where codigo =?",[data,codigo])
  
    res.redirect("/views/proveedor")
}

controllerProveedor.deleteProveedor =async (req, res) => {

    const {codigo}=req.params
    await pool.query("DELETE FROM proveedor where codigo =?",[codigo])
    res.redirect("/views/proveedor")


}

module.exports = controllerProveedor;