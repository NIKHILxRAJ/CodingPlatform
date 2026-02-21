 const express = require('express')
 const app = express();
 require('dotenv').config();
 const main = require('./config/db');
 const { parse } = require('dotenv');   //why this line is here i dont know where it belong to ..
  const cookieParse = require('cookie-parser');
   const authRouter = require("./routes/userAuth");

    app.use(express.json());
    app.use(cookieParse()); 

    app.use('/user',authRouter);

 main()
 .then(async()=>{

     app.listen(process.env.PORT,()=>{
        console.log("Server listenin at port number: "+ process.env.PORT);
     })
 })
 .catch(err=>console.log("Error Occured: "+err));