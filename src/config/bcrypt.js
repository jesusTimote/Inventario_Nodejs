const bcrypt = require('bcryptjs')

const object = {};

object.encryptPassword = async (contraseña) => {
    try {
        const salt=await bcrypt.genSalt(10);
        return await bcrypt.hash(contraseña, salt)
    } catch (error) {
        console.log("Error" + error);
    }

}

object.decryptPassword = async (contraseña, valor) => {
    try {
        return await bcrypt.compare(contraseña, valor);
    } catch (error) {
        console.log(error);
    }

}

module.exports = object;