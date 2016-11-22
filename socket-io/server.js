var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.get('/push', function(req, res){
    var channelId = req.param('channelid');
    var username = req.param('username');
    var password = req.param('password');
    
    // client output
    res.send('pushed to: ' + channelId);
    
    // push login to the correct client
    io.to(channelId).emit('fastlogin', {type: 'login', channelid: channelId, username: username, password: password});

});


io.on('connection', function(socket){
    
    // send my channel and trigger qr code
    socket.emit('fastlogin', {type: 'init', channelid: socket.id});
    
    
    socket.on('fastlogin', function(msg){
        /*io.emit('fastlogin', msg);
        console.log("connected :"+socket.id);*/
    });
});

http.listen(process.env.PORT, function(){
    console.log('listening on *:' + process.env.PORT);
});