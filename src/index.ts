import { dev } from "./config/Configuration";
import { dev2 } from "./config/DbConfig";
import express from "express"

const app = express(); 
const port = process.env.PORT ||  8080; 

app.get('/', function(req:any, res:any){
     var en:any=null
     if (process.env.NODE_ENV =='production') {
        en = dev2
     }else{
        en = dev
     }

     res.json({
        data:en
     })
})

app.listen( port, function(){
    console.log("Your app running on port " + port);
})






