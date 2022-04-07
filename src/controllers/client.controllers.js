//creamos el objeto para todos los metodos
const clientController = {};
//importamos la base de datos 
const pool = require('../database/bd')

 const passport= require("passport")


//creamos el metodo listar con el objeto creado
clientController.vistaCliente =  async (req, res) => {
    res.render('Client/addClient', {
        titulo: "CLIENTE",
        descripcion: "Detalle Cliente"
    })
}

clientController.tableList = async (req, res) => {
    await pool.query("SELECT * FROM CLIENTE", (error, result) => {
        if (error) throw error

        const data = JSON.stringify(result)
        res.send(data)
    })

}


clientController.addClient = async (req, res) => {
    const mensaje = [];
    const { nombre, apellido, dni, telefono, correo } = req.body
    if (!nombre || !apellido || !dni || !telefono || !correo) {
        mensaje.push({
            alert: true,
            title: "Advertencia",
            text: "Complete todos los Campos",
            icon: "warning",
            showConfirmButton: true,
        })
        req.flash("error", mensaje)
        res.redirect("/views/client")
    } else {
        const data = {
            nombre,
            apellido,
            dni,
            telefono,
            correo
        }
        await pool.query("INSERT INTO cliente SET ?", [data], (error, result) => {
            if (error) throw error
            mensaje.push({
                alert: true,
                title: "Exito",
                text: "Datos Guardados",
                icon: "success",
                showConfirmButton: true,
            })
            req.flash('success', mensaje)
            res.redirect("/views/client")
        })
    }

}
clientController.deleteClient = async (req, res) => {
  
    const { id } = req.params;
    await pool.query("DELETE FROM cliente WHERE id=?", [id], (error, result) => {
        if (error) {
            throw error
        } else {


            res.redirect("/views/client")
        }
    })


}

clientController.editClient=async(req, res) => {
    const {id_edit} = req.body
    const { nombre_edit, apellido_edit, dni_edit, telefono_edit, correo_edit } = req.body
   const datos ={
        nombre:nombre_edit,
        apellido:apellido_edit,
        dni:dni_edit,
        telefono:telefono_edit,
        correo:correo_edit
   }
    await pool.query("UPDATE cliente set ? where id=?",[datos,id_edit])
    res.redirect("/views/client")
}
module.exports = clientController