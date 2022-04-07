const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
//const jwt = require('jsonwebtoken');
const pool= require('../database/bd');
const bcrypt = require('../config/bcrypt')

const passportJWT = require("passport-jwt");

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use("local",new LocalStrategy({
            usernameField: "correo",
            passwordField: "contraseña",
            passReqToCallback: true
        },async(req,correo,contraseña,done) => {
            const mensajes = []
            const rows=await pool.query("SELECT * FROM usuario WHERE correo=?",[correo])
              if (rows.length > 0) {
                const user = rows[0]
                const valiPassword = await bcrypt.decryptPassword(contraseña, user.contraseña)
               
                if (valiPassword) {
                  /*  jwt.sign({id:rows.id},process.env.JWT_SECRETO,{
                        expiresIn:process.env.JWT_TIEMPO_EXPIRA
                    })*/
                    
                   
                    done(null, user, req.flash("success","Welcome"))
             
                } else {
                    mensajes.push({
                        alert: true,
                        title: "Error",
                        text: "Contraseña no encontrado",
                        icon: "error",
                        showConfirmButton: true,
                    })
                    done(null, false, req.flash("error",mensajes))
                }

               
            } else {
                mensajes.push({
                    alert: true,
                    title: "Error",
                    text: "Correo no encontrado",
                    icon: "error",
                    showConfirmButton: true,
    
                })
                return done(null, false, req.flash("error",mensajes))
            }



            /*if(!user){
                mensajes.push({
                    alert: true,
                    title: "Error",
                    text: "Correo no encontrado",
                    icon: "error",
                    showConfirmButton: true,
    
                })
           
                    return done(null,false,{message:mensajes})
            }else{
                const compare=await bcrypt.decryptPassword(contraseña)
                if(compare){

                    return done(null,user)
                }else{
                    mensajes.push({
                        alert: true,
                        title: "Error",
                        text: "Contraseña no encontrado",
                        icon: "error",
                        showConfirmButton: true,
        
                    })
                    return done(null,false,{message:mensajes})
                }
            }*/
        }
    )

)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query("select * from usuario where id=?", [id]);
    done(null, rows[0])
})

passport.use("jwt",new JWTStrategy({
        secretOrKey:"top_secret",
        jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
        //jwtFromRequest:ExtractJwt.fromUrlQueryParameter("secret_token")

    },async (token, done) => {
        try {
            console.log("1-",token);
            console.log("2-",token.user.id);
            console.log("3-",null,token.user);
           
            await pool.query("SELECT * FROM USUARIO WHERE id = ?",[token.user.id],(err, result) => {
                token.user =result[0]
                console.log("4.1-",token.user=result[0]);
               
                  return done(null,token.user =result[0])
            })
            //return done(null,token.user)
          

             
        } catch (error) {
            done(error);
        }
    })
)