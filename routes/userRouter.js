const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userModel} = require("../modles/user")
const userRouter = express.Router();
require("dotenv").config()



userRouter.post("/signup",async(req,res)=>{
    try {
        let {email,password,confirmPassword} = req.body;
    
        let data = await userModel.findOne({"email":email});

        if(!data){
            if(password == confirmPassword){
                bcrypt.hash(password,5,async(err,hash)=>{
                    if(hash){
                        let data = new userModel({email,password:hash})
                        await data.save();
                        res.send({"msg":"data is saved"});
                    }else{
                        res.send({"msg":"something went wrong"});
                        
                    }
                })
            }else{
                res.send({"msg":"password is not matching"});
            }
        }else{
            res.send({"msg":"user is already register"});

            
        }


        
    } catch (error) {
        res.send("error")
        
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        let {email,password} = req.body;
        let data = await userModel.findOne({"email":email});

        if(data){
            bcrypt.compare(password,data.password,async(err,result)=>{
                if(result){
                    let token = jwt.sign({email:email},process.env.KEY,{expiresIn:"7d"});

                    res.send({"msg":"login successfull",token});
                }
            });
            
                
        
        }else{
            res.send("you have to register first");
        }
        
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = {
    userRouter
}