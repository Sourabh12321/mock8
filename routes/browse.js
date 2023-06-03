const express = require("express");
const {postModel} = require("../modles/post")
const browserRouter = express.Router();


browserRouter.get("/data",async(req,res)=>{
    try {
        let data = await postModel.find();

        res.send({msg:data});
    } catch (error) {
        res.send({"msg":error.message});
        
    }
})


browserRouter.get("/ASCsort",async(req,res)=>{
    try {
        let data = await postModel.find();

        data.sort((a,b)=>{
            return a.postedAt - b.postedAt;
        })
        res.send({msg:data});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

browserRouter.get("/DESCsort",async(req,res)=>{
    try {
        let data = await postModel.find();

        data.sort((a,b)=>{
            return b.postedAt - a.postedAt;
        })
        res.send({msg:data});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

browserRouter.get("/Cfilter",async(req,res)=>{
    try {
        let data = await postModel.find({"category":"clothing"});

        res.send({msg:data});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

browserRouter.get("/Efilter",async(req,res)=>{
    try {
        let data = await postModel.find({"category":"electronics"});

        res.send({msg:data});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

browserRouter.get("/Ffilter",async(req,res)=>{
    try {
        let data = await postModel.find({"category":"furniture"});

        res.send({msg:data});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

browserRouter.get("/Ofilter",async(req,res)=>{
    try {
        let data = await postModel.find({"category":"other"});

        res.send({msg:data});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

browserRouter.get("/search",async(req,res)=>{
    try {
        let {search} = req.query;
        let data = await postModel.find({"name":search});


        
        res.send({msg:data});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

browserRouter.patch("/edit/:id",async(req,res)=>{
    try {
        let {id} = req.params;
        let value = await postModel.findByIdAndUpdate({"_id":id},req.body);
        await value.save();
        res.send({msg:"updated successfully"});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

browserRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let {id} = req.params;
        let value = await postModel.findByIdAndDelete({"_id":id});
        res.send({msg:"deleted successfully"});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

module.exports = {
    browserRouter
}

