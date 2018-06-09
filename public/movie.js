const express=require('express');
const router=express.Router();
const async = require('async');
const request=require('request');

router.post('/',(req,res)=>{
    let cheapest;
      async.parallel({
        cine: function(callback) {
          request('http://localhost:9876/api/cinemaworld/movies', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body)
                  callback(null, body);
              } else {
                callback(true, {});
              }
          });
        },
          film: function(callback) {
            request('http://localhost:9876/api/filmworld/movies', function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                // console.log(body)
                callback(null, body);
                } else {
                  callback(true, 'film');
                }
            });
          }
        }, 
        function(err, results) {console.log(results);
          let cheapestCinema=results.cine;//console.log(cheapestCinema);
          let cheapestFilm=results.film;//console.log(cheapestFilm);
          let mov=JSON.parse(cheapestCinema);//console.log(mov)
          let mincinemaprice
          let cineElement
          mov.results.forEach(element=>{
            if(mincinemaprice){
              if(element.Price<mincinemaprice){
                mincinemaprice=element.Price
                cineElement=element
              }
          }else{
            mincinemaprice=element.Price;
            cineElement=element;
          }
          });
          mov=JSON.parse(cheapestFilm);//console.log(mov)
          let minfilmprice
          let filmElement
          mov.results.forEach(element=>{
            if(minfilmprice){
              if(element.Price<minfilmprice){
                minfilmprice=element.Price;
                filmElement=element;
              }
              else{
                minfilmprice=element.Price;
                filmElement=element;
              }
          }  
        });
        console.log(filmElement);
          cheapest=mincinemaprice>minfilmprice?filmElement:cineElement;
          res.writeHead(200, {"Content-Type": "application/json"});
         res.end(JSON.stringify(cheapest));
        });
      });
router.post('/:id',(req,res)=>{
        let movie;
        const Id=req.params.id;
        console.log('Id = '+Id);
        async.parallel({
            cine:function(callback) {
              request('http://localhost:9876/api/cinemaworld/movies/'+Id, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  if(body==null){
                    movie=body;console.log(body)
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
            if(err){            
              return console.log(err);
            }
            let cinema=JSON.parse(results.cine)
            console.log(cinema.results)
            
            let film=JSON.parse(results.film)
            console.log(film.results)
            movie=cinema.results?cinema.results:film.results?film.results:null
            res.writeHead(200, {"Content-Type": "application/json"});
      
            res.end(JSON.stringify(movie));
          });
        });
  
module.exports = router
