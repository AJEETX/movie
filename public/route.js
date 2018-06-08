const express=require('express');
const router=express.Router();
const users=[{  name:"webjet",   password:"webjet" }];
const tokenCode="sjd1HfkjU83ksdsm3802k";
const async = require('async');
const request=require('request');

router.post('/login',function(req,res){
    var message;
    for(var user of users){
      if(user.name!=req.body.name){
          message="Wrong Name";
      }else{
          if(user.password!=req.body.password){
              message="Wrong Password";
              break;
          }
          else{
            var token=tokenCode;
			      console.log("Login Successful. Token ="+token );			  
              message="Login Successful";
              break;
          }
      }
    }
    if(token){
        res.status(200).json({
            message,
            token
        });
    }
    else{
        res.status(403).json({
            message
        });
    }
})
router.use((req, res, next)=>{
    console.log(req.body);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        if(token!=tokenCode){
            console.log(token)
            res.status(403).json({
            message:"Wrong Token"
          });
        }
        else{
          req.decoded=tokenCode;
          next();
        }
    }
    else{
      res.status(403).json({
        message:"No Token"
      });
    }
});
var routes=require('./movie')
router.use('/movie',routes)
module.exports = router
