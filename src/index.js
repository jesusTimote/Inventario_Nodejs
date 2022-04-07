//***Module exports
const express = require('express');
/*------ ----- Plantilla de html ----- ------*/
const expHbs = require('express-handlebars')
/*------ ----- Para direccionar con el archivo ----- ------*/
const path = require('path');
/*------ ----- Es como un log de errores ----- ------*/
const morgan = require('morgan')
/*------ ----- Para los metodos DELETE,UDDATE ----- ------*/
const methodOverride = require('method-override')
/*------ ----- Para mensajes ----- ------*/
const flash = require('connect-flash')
/*------ ----- Para guardar la session en login ----- ------*/
const session = require('express-session')
/*------ ----- Para guardar la session en bd  ----- ------*/
const MySQLStore = require('express-mysql-session')(session);
/*------ ----- Para la seguridad de sesiones en login ----- ------*/
const passport = require('passport')
/*----- Importamos la bd para guardar vla sessiones  -----*/
//const {database}=require('./database/coneccion')
//***Initialization
/*------ ----- Instanciamos express ----- ------*/
const app = express();

/*------ ----- Varables de entorno ----- ------*/
require('dotenv').config()
require("./config/passport")
//***Settings
/*------ ----- Asignacion de Puerto ----- ------*/
app.set("port", process.env.PORT || 3000);
/*------ ----- Configuracion de las vistas ----- ------*/
app.set("views", path.join(__dirname, "views"))
/*------ ----- Configuracion de las plantillas ----- ------*/
app.engine(".hbs", expHbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layout"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"

}))
app.set('view engine', ".hbs")

//***Middleware
/*------ ----- declaramos las sesiones de "express-session" ----- ------*/
const options={
    host: "localhost",
    user:"root",
    database:"puebainventario"
}
new MySQLStore(options)
app.use(session({
    key: "session-cookie",
    secret:"eb71faea140e8bb8ccb30557bcdd4ac2",
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore(options)
}));
/*------ ----- declaramos el message "connect-flash" ----- ------*/
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
/*------ ----- declaramos el   passport ----- ------*/
app.use(passport.initialize());
app.use(passport.session());
/*------ ----- declaramos los metodos de PUT, DELETE ----- ------*/
app.use(methodOverride("_method"))






//***Global variables
/*------ ----- Configuracion de los mensajes----- ------*/
app.use((req, res, next) => {
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.success_msg=req.flash("success_msg")
   
    next();
})
//***Roters
app.use(require("./routes/user.routes"))
app.use(require("./routes/client.routes"))
app.use(require("./routes/login.routes"))
app.use(require("./routes/newOrder.routes"))
app.use(require("./routes/product.routes"))
app.use(require("./routes/proveedor.routes"))
app.use(require("./routes/empleados.routes"))

//***Static file
app.use(express.static(path.join(__dirname, 'public')))


//***module exports
module.exports = app;