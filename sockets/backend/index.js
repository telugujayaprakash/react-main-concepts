const express = require("express")
const http=require('http')
const app=express()
const cors= require("cors");
app.use(cors());
const {Server}=require('socket.io')

const server=http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection',(socket)=>{
    console.log("User connected")
    socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    })
})


server.listen(3001,()=>{
    console.log("Server started at 3001");
})

