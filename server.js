const express = require('express');
const app=express();
const async = require('async');
const request=require('request');
const port=process.env.PORT || 3000;
const bodyParser= require('body-parser');
const tokenCode="sjd1HfkjU83ksdsm3802k";
const cinema=[{id:13,title:'cine$11',price:11},{id:2,title:'cine$21',price:21}];
const film=[{id:1,title:'film$12',price:12},{id:23,title:'film$2',price:2}];
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
      cine: function(callback) {
        request('http://localhost:9876/api/cinemaworld/movies', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, body);
            } else {
              callback(true, {});
            }
        });
      },
        film: function(callback) {
          request('http://localhost:9876/api/filmworld/movies', function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  callback(null, body);
              } else {
                callback(true, {});
              }
          });
        }
        }, function(err, results) {console.log(results);
        let cheapestCinema=results.cine;console.log(cheapestCinema);
        let cheapestFilm=results.film;console.log(cheapestFilm);
        let movie;
       if(cheapestCinema.price>cheapestFilm.price){
       movie=cheapestFilm;
       }else{
         movie=cheapestCinema;
       }

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
        request('http://localhost:9876/api/cinemaworld/movies/'+Id, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            if(body){
              movie=body;
            }
              callback(null, body);
          } else {
            callback(true, {});
          }
      });
    },
      film: function(callback) {
        request('http://localhost:9876/api/filmworld/movies/'+Id, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              if(body){
                movie=body;
              }
                callback(null, body);
            } else {
              callback(true, {});
            }
        });
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