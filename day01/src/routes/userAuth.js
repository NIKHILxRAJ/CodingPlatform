const express = require('express');

const authRouter = express.Router();

const {register,login,logout} = require('../controllers/userAuthenticate')


// Register

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
// authRouter.post('getProfile',getProfile); 

module.exports = authRouter;
// login
// logout
//GetProfile