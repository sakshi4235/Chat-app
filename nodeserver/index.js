// install nodemon in the nodeserver folder
//node server which will handle socket io connections
var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

const users={};

io.on('connection',(socket) =>{
    socket.on('new-user-joined',name =>{
        console.log("New user",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send' ,(message)=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect' ,(message)=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})
http.listen(8000,function(){
    console.log('listening');
})

