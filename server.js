const express = require("express");
const http = require("http");
const { Socket } = require("socket.io-client");
const {Server} = require("socket.io");
const ACTIONS = require("./src/Actions");

const app = express();

const server = http.createServer(app);
const io = new Server(server)

const userSocketmap = {};

function getallconnectedclients(roomId){
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username : userSocketmap[socketId],
        }
    });
}

io.on("connection",(socket)=>{
    socket.on(ACTIONS.JOIN,({roomId,username})=>{
        userSocketmap[socket.id] = username;
        socket.join(roomId);
        const clients = getallconnectedclients(roomId);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED , {
                clients,
                username , 
                socketId : socket.id
            })
        })
    })

    socket.on("disconnecting",()=>{
        const rooms = [...socket.rooms]
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                socketId : socket.id,
                username : userSocketmap[socket.id],
            })
        })

        delete userSocketmap[socket.id];
        socket.leave();
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})