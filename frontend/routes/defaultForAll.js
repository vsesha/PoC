'use strict'
//This is a Middleware - executed for all requests
module.exports = function (expressApp){

expressApp.use( defaultForAllRequest );

	function defaultForAllRequest(request, response, next){
		console.log("defaultForAllRequest");
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Headers", 
						"Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
		response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
		response.setHeader('Content-Type','application/json');
		next()
	}
}
