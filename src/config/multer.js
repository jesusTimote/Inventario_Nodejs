/*------ ----- Para subida de archivos e imagenes----- ------*/
const multer =require('multer');
const path = require('path');
/*------ ----- Para direccionar con el archivo ----- ------*/


const storage =multer.diskStorage({
    destination: path.join(__dirname,"../public/img/product"),
    filename: (req,file,cb) => {
        cb(null,file.originalname)
      
    }
})

const upload=multer({
    storage,
    fileFilter: (req,file,cb) => {
        const fileType =/jpeg|jpg|png|gif/;
        const mimetype=fileType.test(file.mimetype)
        const extename=fileType.test(path.extname(file.originalname));
        if(extename && mimetype){
            return cb(null,true)
        }
        cb("Debe ser una imagen ")

    }
}).single("imagefile");



module.exports =upload