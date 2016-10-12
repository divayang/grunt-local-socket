# grunt-local-socket
A socket.io simulated-server just for local development.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-local-socket --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-local-socket');
```

## The "localSocket" task

### Overview
In your project's Gruntfile, add a section named `localSocket` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  localSocket: {
    options: {
      // Task-specific options go here.
    },
    customized_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.port
Type: `Number`
Default value: `8088`

A number value that is used to assign the port used by local socket.io server.

#### options.base
Type: `String`
Default value: `'./'`

A string value that is used to indicate base repository your local socket.io server's script files locates in.

#### options.directory
Type: `String`
Default value: `'/'`

A string value that is used to indicate the sub-repository(if you have one) under the base.

#### options.serverScript
Type: `String` or `Function`
Default value: `''`

This param is used to composite a simulated-response by the socket.io server. 
Use string value to indicate the script file you composited, or directly write an anonymous function with the passed-arguments which refers to the socket.io instance, and then do whatever you like.


### Usage Examples

#### Default Options
In this example, use default options with a anonymous function as the serverScript.

```js
grunt.initConfig({
  localSocket: {
    options: {
        port: 8088,            
        serverScript: function(socketServer){            
            socketServer.on('connection', function (socket) {                
                socket.volatile.emit('message', {data: 'hello~'});                    
            });            
        }
    }
  }
});
```

#### Custom Options
In this example, custom options are used to make addtional customized task which will overwrite the default params by their own's one. 

```js
grunt.initConfig({
  localSocket: {
    options: {
        port: 8088,  
        base:  './demo-base',  
        directory: '/demo-script'
    },
    myTask1: {
    	options: {
            serverScript: 'task1.js' //finally access to ./demo-base/demo-script/task1.js
        }
	},
	myTask2: {
    	options: {
            directory: '/dev-script', 
            serverScript: 'task2.js'  //finally access to ./demo-base/dev-script/task2.js
        }
	}
  }
});
```

#### Code in `serverScript` files
Here is the example, simply shows what you could do in your `serverScript` files. 

```js
//task1.js
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
```

#### Run task
PS:　"grunt localSocket" will just fire the **first one** in your customized-tasks (for example: `myTask1` in the example above).
 
```shell
grunt localSocket
```

Just append "**:taksname**" to the command like "grunt localSocket**:taksname**", then task `taksname` will be alive. 
 
```shell
grunt localSocket:myTask1
```