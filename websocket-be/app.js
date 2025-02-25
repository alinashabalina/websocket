require('dotenv').config()

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

function checkRate() {
    try {
        fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.exchangeAPIKey}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }})
            .then(data => {
                if (data) {
                    const keys = data.data
                    io.emit('rates', Math.round(keys.EUR * 100) / 100)
                }
                else {
                    io.emit('error', 'Rate limit exceeded')
                }
            })

    } catch (error) {
        console.error(error)
    }
}

io.on('connection', (socket) => {
    console.log('connected to', socket.id)
    socket.on('initial_message', () => {
        checkRate()
    });

    socket.on('ping', () => {
        checkRate()
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(process.env.port, () => {
    console.log(`Socket.IO server running on http://localhost:${process.env.port}`);
});