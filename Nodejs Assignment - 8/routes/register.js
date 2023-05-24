const express = require('express');
const UserModel = require('../model/User');
const bcrypt = require('bcrypt')
const registerRoute = express.Router()



registerRoute.post('' , async (req , res ) => {

    const body = req.body;
    //checking for empty or partial data
    if(!body || !body.name || !body.email || !body.password){
        return res.status(400).json({
            "message" : "please provide valid details"
        })
    }

    //using bcrypt to encrypt the password
    const encryptedPassword = await bcrypt.hash(body.password,15);

    try{
        const user = new UserModel({
            email : body.email,
            name : body.name,
            password : encryptedPassword,
            registeredOn : new Date()
        });
        const response = await user.save();
        if(response){
            return res.status(200).json({
                "status" : "success",
                "data" : response
            })
        }
        else{
            res.status(500).json({
                "message" : "something went wrong"
            }) 
        }
 
    }
    catch (err){
        //if the email is already use it will be an error and will come to catch block
        res.status(409).json({
            "message" : "email is already in use"
        })
    }

})

module.exports = registerRoute;