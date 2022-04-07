const { Router } = require('express')
const router = Router();
const passport= require("passport")
const {
    vistaUsuario,
    registroUsuario,
    actualizaUsuario,
    eliminarUsuario
}=require('../controllers/user.controllers')
//router.get('/user/views',passport.authenticate('jwt', { session: false }),vistaUsuario)
router.get('/user/views',vistaUsuario)
router.post('/user/add',registroUsuario)
router.put('/user/update',actualizaUsuario)
router.delete('/user/delete/:id',eliminarUsuario)

module.exports = router;