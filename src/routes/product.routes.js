//Importamos router de espress para las rutas
const {Router} = require('express');
//Inicializamos router
const router= Router();


const uploadImage = require("../config/multer")
const {viewProducts,addProducts,editProducts,UpdateProducts,deleteProducts,viewAddProduct,ListarProducto,GenerarCodigoBarra} =require("../controllers/product.controllers")

router.get("/views/new-Product/",viewProducts)
router.get("/views/view-Product/",viewAddProduct)
router.get('/data/table/producto/',ListarProducto)
router.post("/views/add-Product/",uploadImage,addProducts)
router.get("/views/edit-Product/:id",editProducts)
router.post("/views/edit-Product/:id",uploadImage,UpdateProducts)
router.get("/views/delete-Product/:id",deleteProducts)
router.get("/views/code-barras/",GenerarCodigoBarra)
router.post("/views/code-barras/",GenerarCodigoBarra)

module.exports = router