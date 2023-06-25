const express=require('express');
const serveStatic=require('serve-static');
const https = require("https");
const path = require("path");
const fs = require("fs");


var hostname="localhost";
var port=3001;


var app=express();


app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);
    //Checking the incoming request type from the client
    if(req.method!="GET"){
        res.type('.html');
        var msg='<html><body>This server only serves web pages with GET request</body></html>';
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname + "/..", 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname + "/..", 'cert', 'cert.pem'))
}, app)

//app.listen(port,hostname,function(){
sslServer.listen(port, function(){
    console.log(`Server hosted at https://${hostname}:${port}`);
});