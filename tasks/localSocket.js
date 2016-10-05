module.exports = function(grunt){
    grunt.registerMultiTask('localSocket', 'Start a socket.io simulated-server just for local development.', function(){        
		var done = this.async();
		//Merge options from grunt task configs
		var options = this.options({
				port: 8088,
				base: './',
				directory: '/',
				serverScript: ''
			});
			
		//console.log(grunt.file.read('dev/socket/test.js'));		
			
		grunt.log.writeln('localSocket server will start ...');	
        require('../server.js')(options, grunt);   
   });
};

