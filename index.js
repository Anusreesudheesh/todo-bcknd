import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import userR from "./router/userR.js"; //default,so,we can give any name(userR)
import authR from "./router/authR.js";
import todoR from "./router/todoR.js";

const app = express();
dotenv.config();

// model1
// const userSchema=mongoose.Schema({
//     name:{
//         type:String,
//         unique:true,
//         required:true,
//         trim:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     mobile:{
//         type:Number,
//         required:true,
//     }
// },{timestamps:true})

// const userModel1=mongoose.model("public",userSchema)  //model() is a builtin fn

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo");
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

//middlewares

// path=/api/user/create

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("files"));

app.use('/images',express.static('images'));

app.use(
  fileUpload({
    uriDecodeFileNames: true,
    // useTempFiles : true,
    // tempFileDir : 'uploads'
  })
);

app.use("/api/user", userR);
app.use("/api/auth", authR);
app.use("/api/todo", todoR);

// app.get("/user/create",getUser);

// app.post('/user/create',userCreate);

//server port connections
app.listen(8800, () => {
  connect();
  console.log("connected to backend");
});
