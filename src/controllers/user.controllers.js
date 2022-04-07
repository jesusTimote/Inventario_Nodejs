/*------ ----- Creamos un OBJETO que contendran los meodos CRUD------ ------*/
const UserController = {};
/*------ ----- Importamos la base de datos ------ ------*/
const pool = require('../database/bd')
/*------ ----- Importamos el modulo config que 
        contiene bcript el cifrado de datos ------ ------*/

const object = require('../config/bcrypt');
//const passport= require("passport")
/*------ ----- Controlador  Vista y Listado ----- ------*/
UserController.vistaUsuario =async (req, res) => {
    const listadata = await pool.query("SELECT id,nombre,usuario,correo,permiso,estado,fecha FROM usuario")

    res.render("User/user", {
        listadata,
        titulo: "Usuario",
        descripcion: "Detalle Usuario"
    })
}
/*UserController.vistaUsuario =(req, res, next) => {
    res.json({
      message: 'You did it!',
      user: req.user,
     pollo:req.session
    })
    next()

  }*/
/*------ ----- Controlador  para Grabar ----- ------*/
/*------ ----- Para mensajes trabajamos con sweealert2 con connect-flash----- ------*/
UserController.registroUsuario = async (req, res) => {
    try {
        //Agregamos un objecto para guardar los mensajes de error
        const mensajes = []
        const { nombre, usuario, correo, permiso, estado, contraseña, repetir } = req.body
        if (!nombre || !usuario || !correo || !permiso || !estado || !contraseña) {
            //push sirve para guardar los datos en el objeto
            mensajes.push({
                alert: true,
                title: "Advertencia",
                text: "Complete todos los Campos",
                icon: "warning",
                showConfirmButton: true,

            })

        } if (contraseña != repetir) {
            mensajes.push({
                alert: true,
                title: "Error",
                text: "La contraseña no coincide ",
                icon: "error",
                showConfirmButton: true,

            })
        } if (contraseña.length <= 4) {
            mensajes.push({
                alert: true,
                title: "Advertencia",
                text: "La contraseña debe ser mayor a 4",
                icon: "error",
                showConfirmButton: true,

            })
            //verificamos si en el objeto tiene errores guardados
        } if (mensajes.length > 0) {
            //si lo tiene errores guardado mostramos los errores en la vista
            // req.flash("nombre de la variable", el mensaje a mostrar)
            req.flash("error", mensajes)
            res.redirect("/user/views")

        } else {
            const datos = {
                nombre,
                usuario,
                correo,
                permiso,
                estado,
                contraseña,
                fecha: new Date().toISOString()
            }
            datos.contraseña = await object.encryptPassword(datos.contraseña)
            console.log(datos);
            await pool.query("INSERT INTO usuario set ?", [datos])
            mensajes.push({
                alert: true,
                title: "Exito",
                text: "Datos Guardados",
                icon: "success",
                showConfirmButton: true,

            })
            req.flash('success', mensajes)
            res.redirect("/user/views")

        }

    } catch (error) {
        console.log(error);
    }

}

/*------ ----- Controlador  para Actualizar ----- ------*/
UserController.actualizaUsuario = async (req, res) => {
    const mensajes = []
    let idEdit = req.body.id_edit
    const { nombre_edit, usuario_edit, correo_edit, permiso_edit, estado_edit, } = req.body
    const datos = {
        nombre: nombre_edit,
        usuario: usuario_edit,
        correo: correo_edit,
        permiso: permiso_edit,
        estado: estado_edit,
    }
    await pool.query("UPDATE usuario set ? where id=?", [datos, idEdit])
    mensajes.push({
        alert: true,
        title: "Exito",
        text: "Datos Actualizados",
        icon: "success",
        showConfirmButton: true,
    })
    req.flash('success', mensajes)
    res.redirect("/user/views")
  

}
/*------ ----- Controlador  para Eliminar ----- ------*/
UserController.eliminarUsuario = async (req, res) => {
    const mensajes = [];
    const { id } = req.params;
    console.log(id);
    await pool.query("DELETE FROM usuario WHERE id =?", [id])
    
    mensajes.push({
        title: '¿Estas Seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI, Eliminalo!',
        opcion: id
    })
    req.flash('success_msg', mensajes)
    res.redirect("/user/views")


}

module.exports = UserController;