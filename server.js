const express = require('express');
const app=express();
const async = require('async');
const request=require('request');
const port=process.env.PORT || 3000;
const bodyParser= require('body-parser');
const tokenCode="sjd1HfkjU83ksdsm3802k";

app.use( bodyParser.json() );

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.get('/', (req,res)=>{
    res.sendFile('index.html');
});

const routes=require('./public/route')
app.use('/',routes)

app.listen(port, function(){ console.log(`listening on port ${port}`);});