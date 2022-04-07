
const controllerEmpleado={};

const pool =require('../database/bd');

controllerEmpleado.vistaEmpleado=(req, res) => {
    res.render('Empleado/empleado')
}

module.exports = controllerEmpleado;