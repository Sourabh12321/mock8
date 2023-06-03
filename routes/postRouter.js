const express = require("express");
const {postModel} = require("../modles/post");
const postRouter = express.Router();


postRouter.post("/add",async(req,res)=>{
    try {
        let data = new postModel(req.body);
        await data.save();
        res.send({"msg":"post saved"});
    } catch (error) {
        res.send(error.message);
        
    }
})

module.exports = {
    postRouter
}