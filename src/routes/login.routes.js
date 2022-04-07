//Importamos Router de expres para navegacion de rutas
const {Router} = require('express');
//Inicializamos router
const router =Router();
//Importamos los metodos de controller de login
const {viewsSignIn,signIn,logout}=require('../controllers/login.controllers')


router.get('/signIn',viewsSignIn)

router.post('/signIn',signIn)
router.get('/logout',logout)
module.exports=router;