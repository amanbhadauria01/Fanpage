const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');

const db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.login = async (req,res)=>{
  try{
     const{email,password} = req.body;
     if(!email || !password){
        return res.status(400).render('login',{
            message : 'Please provide an email and password'
        });         
     }
     db.query('SELECT * FROM users WHERE email = ?',[email],async(error,results)=>{
        if((results.length===0) || !results || !(await bcrypt.compare(password,results[0].password))){
            //  console.log("came here");
             return res.status(401).render('login',{
                 message : 'Email or password is incorrect'

             })
         }else{
             const id = results[0].id;
             const token = jwt.sign({id : id},process.env.JWT_SECRET,{
                 expiresIn : process.env.JWT_EXPIRES_IN
             });
             const cookieOptions = {
                 expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                 httpOnly: true
             }
             res.cookie('jwt',token,cookieOptions);
             res.status(200).redirect('/');
         }
     }) 

  }catch(error){
      console.log(err);
  }
}

exports.register = (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    db.query('SELECT email FROM users WHERE email = ?',[email],async (err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length > 0){
            return res.render('register',{
                message : 'That email is already in use'
            });
        }else if(password !== passwordConfirm){
            return res.render('register',{
                message : 'Passwords dont match'
            });            
        }
        let hashedPassword = await bcrypt.hash(password,8);
        db.query('INSERT INTO users SET ?',{name : name, email : email,password : hashedPassword},(err,results)=>{
             if(err){
                 console.log(err);
             }else{
                 console.log(results);
                return res.render('register',{
                    message : 'User registered'
                });                 
             }
        })
    });
}


exports.isLoggedIn = async(req,res,next)=>{
    if(req.cookies.jwt){
        try{
            // verifying the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
            // check if the use still exists
            db.query('SELECT * FROM users WHERE id = ? ',[decoded.id],(error,result)=>{
                //  console.log(result);
                 if(!result){
                     return next();
                 }
                 req.user = result[0];
                 return next();
            });
        }catch(error){
           console.log(error);
           return next();
        }
    }else{
        next();
    }
}

exports.logout = async (req,res)=>{
    res.cookie('jwt','logout',{
        expires : new Date(Date.now()+2),
        httpOnly:true
    });
    res.status(200).redirect('/')
}