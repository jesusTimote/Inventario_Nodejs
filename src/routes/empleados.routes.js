const {Router}=require("express");

const router=Router();

const {vistaEmpleado}= require("../controllers/empleados.controllers");


router.get('/empleado/views',vistaEmpleado);
module.exports =router;