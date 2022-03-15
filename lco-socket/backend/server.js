// imports and initialize the app variable
const moment = require('moment');

const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log('Whats is socket: ', socket);
    console.log('Socket is active to be connected');

    socket.on('chat', (payload) => {
        console.log('What is payload: ', payload);
        io.emit('chat', payload)
    });

    // Handler for 'received' event
    socket.on('received', (options) => {
        console.log(options);

        let _options = {
            messageID: options.messageID,
            timetoken: moment().valueOf(),
            userID: options.userName
        };

        // Emit 'delivered' event
        socket.emit('delivered', _options);
    });

    //Handler for 'markSeen' event
    socket.on('markSeen', (options) => {
        console.log(options);

        let _options = {
            messageID: options.messageID,
            timetoken: moment().valueOf(),
            userID: options.userName
        };

        // Emit 'markedSeen' event
        socket.emit('markedSeen', _options);
    });

});

// Express server
// app.listen(5000, () => console.log('server is active...'));

server.listen(5000, () => {
    console.log('Server is listening at port 5000...')
});