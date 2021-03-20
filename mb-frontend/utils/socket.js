import io from "socket.io-client";

const socket = io('http://localhost:3002/room', { 
    transports : ['websocket'], 
    upgrade: false 
});

export async function onClient() {
    let connect = false
    await socket.on('connect', function() {
        console.log('Connected');
        connect = true
    });
    return connect
}