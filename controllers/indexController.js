const sequelize = require('sequelize');
const Auth = require('../models/Auth');
const Todo = require('../models/Todo');
const bcrypt = require('bcrypt');
var session = require('express-session');
const Op = sequelize.Op;

module.exports.loginForm = async(req,res)=>{
    const error = req.flash('error');
    const success = req.flash('success');
    res.render('index',{error,success});
}
module.exports.login = async(req,res)=>{
   const body = req.body;
   const auth = await Auth.findOne({
       where:{
        [Op.or]: [{email:body.uname},{userName:body.uname}]
       }
   });
   if(!auth) return res.status(404).json({ error:'User Not Found'});

   
   isAuth = bcrypt.compareSync(body.psw,auth.password);
  
   if(isAuth)
   {
       //set session
        req.session.user = {
            userid:auth.id,
            useremail:auth.email,
            name:auth.name
        }; 
      return res.redirect('/dashboard');
   }
   else{
    req.flash('error', 'Invalide username/password!')
     return res.redirect('/');
   }
   
}
module.exports.getTopUser = async(req,res)=>{
    let topUsers = await Auth.findAll({
        order:[
            ['id','desc']
        ],
        attributes: ['id','name','email','mobile','userName','joiningDate']
    });
    let getAllTodos = await Todo.findAll({
        order:[
            ['id','asc']
        ],
        attributes:['id','title']
        
    })
    res.render('dashboard',{topUsers,getAllTodos});
}
module.exports.logOut = async(req,res)=>{
    req.flash('success','Logout successfully');
    req.session.destroy();
    res.redirect('/');
}
