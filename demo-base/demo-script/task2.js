module.exports = function(options) {
	var io = options.IO; //Socket.io server instance object

    //demo code which simulates the action on server-side
	io
    .of('/task2')
    .on('connection', function (socket) {
        console.log('connected /task2');
        setInterval(function(){
            socket.volatile.emit('message', {data: 'task2: new message'});
            console.log('/task2: emit message');
        }, 4000);
    });

};