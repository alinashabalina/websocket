require('dotenv').config()

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {

    socket.on('initial_message', (data) => {
        try {
            fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.exchangeAPIKey}`)
                .then(response => response.json())
                .then(data => {
                    const keys = data.data
                    io.emit('ratesEUR', Math.round(keys.EUR * 100) / 100)
                    io.emit('ratesRUB', Math.round(keys.RUB * 100) / 100)
                })

        } catch (error) {
            console.error(error)
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(process.env.port, () => {
    console.log(`Socket.IO server running on http://localhost:${process.env.port}`);
});