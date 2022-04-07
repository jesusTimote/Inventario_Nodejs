//Importamos router de espress para las rutas
const {Router} = require('express');
//Inicializamos router
const router= Router();
//importamos todos los metodos de controllers
const {vistaProveedor,agregarProveedor,listarProveedor,editarProveedor,deleteProveedor}=require('../controllers/proveedor.controllers')


router.get('/views/proveedor',vistaProveedor)
router.post('/views/proveedor/add',agregarProveedor)
router.get('/views/proveedor/list',listarProveedor)
router.post('/views/proveedor/editar-Proveedor',editarProveedor)
router.get('/views/proveedor/delete-Proveedor/:codigo',deleteProveedor)

module.exports = router