 const express = require('express')
 const app = express();
 require('dotenv').config();
 const main = require('./config/db');
const { parse } = require('dotenv');
  const cookieParse = require('cookie-parser');

 app.use(express.json());
app.use(cookieParse()); 

 main()
 .then(async()=>{

     app.listen(process.env.PORT,()=>{
        console.log("Server listenin at port number: "+ process.env.PORT);
     })
 })
 .catch(err=>console.log("Error Occured: "+err));