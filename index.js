const express = require("express");
const {connection} = require("./config/db")
const {userRouter} = require("./routes/userRouter")
const {postRouter} = require("./routes/postRouter");
const {browserRouter} = require("./routes/browse")
require("dotenv").config();
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/browser",browserRouter);
app.get("/",(req,res)=>{
    res.send("home Page")
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("working");
    } catch (error) {
        console.log(error.message);
    }
})