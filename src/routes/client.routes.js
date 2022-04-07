//Importamos router de espress para las rutas
const {Router} = require('express');
//Inicializamos router
const router= Router();
//importamos todos los metodos de controllers
const {vistaCliente,tableList,addClient,deleteClient,editClient}=require('../controllers/client.controllers')


router.get('/views/client',vistaCliente)
router.get('/data/table',tableList)
router.post('/add/Client',addClient)
router.get('/client/delete/:id',deleteClient)
router.post('/client/edit',editClient)
module.exports = router;