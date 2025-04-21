const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const cors=require("cors");


const app=express();

app.use(cors());//allow frontedn to connect

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"*",
    }
})

app.get("/",(req,res)=>{
    res.send("Server is running");
})


io.on("connection",(socket)=>{
    console.log("New Client connected",socket.id);

    //Handle Incoming audio stream
    socket.on("send_message",(data)=>{
        console.log("Audio data received and broadcasted to other clients",data); 
        io.emit("receive_message", data);
    })
    
    socket.on("disconnect",()=>{
        console.log("Client disconnected",socket.id);
    })
})




server.listen(3001,()=>{
    console.log(`Server is running on port 3001`);
})