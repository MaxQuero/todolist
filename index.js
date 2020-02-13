var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, { 'origins': '*:*' });
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Salut tout le monde !');
});
io.on("connection", function (socket) {
    socket.on('addTask', function (task) {
        socket.broadcast.emit('addTask', task);
    });
    socket.on('deleteTask', function (task) {
        socket.broadcast.emit('deleteTask', task);
    });
});
server.listen(4444);
