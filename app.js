/**
 * Created by Andrew on 16/07/2016.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('client'));

/*
app.get('/index.html', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/jquery:', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
*/

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        var formattedMsg = "<" + socket.nickname + "> " + msg
        io.emit('chat message', formattedMsg);
        console.log("someone said..." + formattedMsg);
    });

    socket.on('get nickname', function(data){
        socket.nickname = data;
        console.log(data + " connected");
    });

    io.on('disconnection', function(msg){
        io.emit('disconnected', msg);
        console.log('disconnected');
    });

    socket.emit("get nickname");
    io.emit("someone connected, getting nickname");
    //console.log('connected');

});



http.listen(3000, function(){
    console.log('listening on *:3000');
});
