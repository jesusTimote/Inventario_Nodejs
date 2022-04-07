/*------ ----- Importamos modulo de mysql ----- ------*/
const mysql = require("mysql");
/*------ ----- Importamos modulo de promisify para trabajar con promise ----- ------*/
const { promisify } = require("util");

/* ----------------------------- */
/* Importamos el archivo DB_Conection   
   con la palabra database definida de mysql   */
/* ----------------------------- */
const { database } = require("../database/coneccion");
/*------ ----- Cramos la coneccion ----- ------*/
const pool = mysql.createPool(database);
/*------ ----- Obtememos la coneccion ----- ------*/
pool.getConnection((err,connection)=>{
    /*------ ----- Obtememos Posibles errores de coneecion ----- ------*/
    if(err){
        if(err.code ==="PROTOCOL_CONNECTION_LOST") {
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if (err.code === "ER_CON_COUNT_ERROR"){
            console.error("DATABASE HAS TO MANY CONNECTIONS");
        } 
        if (err.code === "ECONNREFUSED"){
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
    }
    if(connection) connection.release();
    console.log("DATABASE is connected");
    return;
});
pool.query = promisify(pool.query);

module.exports = pool;