const express = require('express');
const app=express();
const async = require('async');
const port=process.env.PORT || 3000;
const bodyParser= require('body-parser');
const tokenCode="sjd1HfkjU83ksdsm3802k";
const cinema=[{id:13,title:'cine$13',price:13},{id:21,title:'cine$21',price:21}];
const film=[{id:12,title:'film$12',price:12},{id:2,title:'film$2',price:2}];
const users=[{  name:"webjet",   password:"webjet" }];

app.use( bodyParser.json() );

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./'));

app.get('/', (req,res)=>{
    res.sendFile('index.html');
});

app.post('/login',(req,res)=>{
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
});

app.use((req, res, next)=>{
        console.log(req.body);
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
            if(token!=tokenCode){
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

app.post('/movie',(req,res)=>{
  let cheapest;
    async.parallel({
        cine: function(callback) {callback(null, cinema);},
        film: function(callback) {callback(null, film);}
      }, function(err, results) {
        let data=results.cine.concat(results.film);
        cheapest=data.reduce((min, p) => p.price < min ? p.price : min, data[0].price);
        let movie=data.find(function(o){ return o.price == cheapest; })
        res.writeHead(200, {"Content-Type": "application/json"});
        console.log(movie);
       res.end(JSON.stringify(movie));
      });
    });

app.post('/movie/:id',(req,res)=>{
  let movie;
  const Id=req.params.id;
  console.log('Id = '+Id);
  async.parallel({
      ci:function(callback) {
        let cmovie=cinema.filter(m=>m.id==Id);
        if(cmovie.length>0){
          movie=cmovie[0].title;
        }
        callback(null,{});
      },
      fi:function(callback) {
        let fmovie=film.filter(m=>m.id===Id);
        if(fmovie.length>0){
          movie=film.filter(m=>m.id===Id)[0].title;
        }
        callback(null,{});
      }
    }, function(err, results) {
      res.writeHead(200, {"Content-Type": "application/json"});
      if(err){            
        return console.log(err);
      }
      if(movie){
        console.log(movie);
        }else{
          console.log('not found');
        }
      res.end(JSON.stringify(movie));
    });
  });
   

app.listen(port, function(){ console.log(`listening on port ${port}`);});