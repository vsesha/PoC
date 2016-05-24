module.exports = function(grunt) {
grunt.initConfig({
  env: {
	  dev: {
		NODE_ENV : 'development',
		DEST : 'builds/dev',
		END_POINT :'localhost:8000'
	  		},
	  prod: {
		NODE_ENV : 'production',
		DEST : 'builds/prod',
		END_POINT :'https://heroku'
	  		},
  	}
		  
  })
	
// development 
grunt.registerTask('dev', ['env:dev' ]);
 // production 
grunt.registerTask('prod', ['env:prod']);
grunt.registerTask('default',['env:dev']);

grunt.loadNpmTasks('grunt-env');
};
	