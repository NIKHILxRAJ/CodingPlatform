const User = require("../models/users");
const User = require("../models/users");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



const validate = require('../utils/validator');

// register features
const register = async(req,res)=>
{
    try{    

        // validate the data;
        validate(req.body);
        const{firstName,emailId,password}=req.body;



         req.body.password = await bcrypt.hash(password,10);

         const user = await User.create(req.body);
         const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});
          res.cookie('token',token,{maxAge:60*60*1000});
          res.status(201).send("User Register sucessfully");
    } 
    catch(err){

        res.status(400).send("Error"+err);
    }
}

// login feature

const login = async(req,res)=>{
    try{
        const {emailId,password}= req.body;
        if(!emailId)
        {
            throw new Error("Invalid Credential");
        }
        if(!password)
        {
            throw new Error = ("Invalid Credential"); 
        }
         const user = User.findOne({emailId});

          const match = bcrypt.compare(password,user.password);

        if(!match)
        {
            throw new Error("Invalid Crendential");
        }

             const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});
          res.cookie('token',token,{maxAge:60*60*1000});
          res.ststus(200).send("Logged in sucessfully");
    }
    catch(err){

        res.status(401).send("Eroor"+err);
    }
}


// logOut feature

const logout = async(req,res)=>
{
    try{
         

    }
    catch(err){

    }
}