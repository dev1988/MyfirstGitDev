module.exports = (req,res,next)=>{
    //console.log(req.session.user.userid);
   if(!req.session.user){
    return res.redirect('/');
   } 
  else{
    return res.redirect('/dashboard');
  }
}