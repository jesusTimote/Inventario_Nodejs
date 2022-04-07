//creamos un objeto que contenga los metodos
const controllerLogin={};
const passport= require("passport")
//importamos jsonwebtoken para seguridad de sesion
const jwt = require('jsonwebtoken');

//creamos los metodos
controllerLogin.viewsSignIn=(req, res) => {
    res.render("Login/signIn", { layout: "login" });

}
/*
controllerLogin.signIn=passport.authenticate("local",{
   failureRedirect: '/signIn',
    successRedirect: '/user/views',
    failureFlash: true

})(req,res,next)*/

/*controllerLogin.signIn=(req, res,next) => {
   
    passport.authenticate("local",{
        failureRedirect: '/signIn',
         successRedirect: '/user/views',
         failureFlash: true
     
     })(req,res,next);
}*/

controllerLogin.signIn= async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      try {
        if (err || !user) {
          console.log("Error "+err)
         
          res.redirect('/signIn')
          return next()
         
        }
        // req.login => .login puede ser renombrado
        req.login(user, { session: false }, async (err) => {
        
          if (err) return next(err)
          const body = { id: user.id, email: user.correo }
  
          const token = jwt.sign({ user: body }, 'top_secret')
          
          const cookie=req.session.jwt=token
          console.log("User:",user,"token:",token);
          console.log("cokkie",cookie);
        // res.json({user, token})
         res.redirect('/user/views')
          
          
        
        })
      }
      catch(e) {
        return next(e)
      }

    })(req, res, next)
  }

controllerLogin.logout = (req, res) => {
    req.logout();

    res.redirect("/signIn")
}
module.exports=controllerLogin;