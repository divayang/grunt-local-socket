/*
 * grunt-local-socket
 * https://github.com/divayang/grunt-local-socket
 *
 * Copyright (c) 2016 divayang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    localSocket: {
            //Default options 
            options: {
                port: 8088, //port for local socket server
                base:  __dirname + '/demo-base', //your simulated server script files's base. PS: it works only when param "serverScript" is passed by "String"
                //serverScript could be a function
                serverScript: function(socketServer){
                    ////Demo: script simulates on server-side
                    socketServer.on('connection', function (socket) {
                        grunt.log.writeln('demo: socket.io connected!');
                        setInterval(function(){
                            socket.volatile.emit('message', {data: 'new message'});
                            grunt.log.writeln.log(' emit message');
                        }, 5000);
                    });
                    ////Demo ends
                }
            },
            //Customized tasks:
            //PS: Customized task params will overwrite those appears in Default options             
            task1: {
                options: {
                    //Javascrit file contains the codes simulates on server-side
                    serverScript: '/demo-script/task1.js'
                }
            },

            task2: {
                options: {
                    //sub-directory in "base" default options
                    directory: '/demo-script', 
                    serverScript: 'task2.js'
                }
            }
        }

  });

  grunt.loadNpmTasks('grunt-local-socket'); 

  //PS:　"grunt localSocket" will just fire the first one in your customized-tasks (for example: `myTask1` in the example above).
  //Just append ":taksname" to the command like "grunt localSocket:taksname", then task `taksname` will be alive. 

};
