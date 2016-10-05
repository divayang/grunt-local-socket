module.exports = function(options) {
	var io = options.IO; //Socket.io server instance object

    //demo code which simulates the action on server-side
	io
    .of('/task1')
    .on('connection', function (socket) {
        console.log('connected /task1');
        setInterval(function(){
            socket.volatile.emit('message', {data: 'task1: new message'});
            console.log('/task1: emit message');
        }, 6000);
    });

};