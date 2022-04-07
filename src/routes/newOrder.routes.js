//Importamos router de espress para las rutas
const {Router} = require('express');
//Inicializamos router
const router= Router();

//importamos todos los metodos de controllers
const {crearPedido,agregarProveedor,agregaProducto,reportsPedido}=require('../controllers/newOrder.controllers')


router.get('/views/new-Order/',crearPedido)
router.post('/views/new-Order/proveedor',agregarProveedor)
//router.get('/views/new-Order/detalleProducto',ListarProductoDetalle)
router.post('/views/new-Order/agrega-Producto',agregaProducto)

router.post('/views/reports/pedido',reportsPedido)

module.exports=router;