var SocketServer = require('socket.io');
var path = require('path');
var fs = require('fs');

module.exports = function(options, _grunt){   
	var IO = new SocketServer(options.port),		
		dir = path.resolve(options.base + options.directory),
		script = options.serverScript,
		scriptFile;
	
	if(typeof script === 'string'){
		scriptFile = dir + '\\'+ script;	
		fs.exists(scriptFile, function(exists){	
			if(exists) {
				fs.readFile(scriptFile, "utf8", function (error, data){
					 if(error) {
						 _grunt.fatal("Error occurs when reading serverScript file: " + scriptFile); 
						 throw error;
						 return;
					 }				 
					 
					 require(scriptFile)({IO: IO});	
					 _grunt.log.writeln("serverScript file executed: " + scriptFile); 
					 _grunt.log.writeln("localSocket server is runing at port:" + options.port + "...");   
				 });
			}
			else {
				_grunt.fatal("serverScript file does not exists: " + scriptFile);   
			}
		});		
	}
	else if(typeof script === 'function'){
		script.call(this, IO);	
		_grunt.log.writeln("serverScript function called: \n" + script); 
		_grunt.log.writeln("localSocket server is runing at port:" + options.port + "...");   
	}
	else {
		_grunt.fatal("Invalid serverScript passed! " + scriptFile);   
	}
	
};