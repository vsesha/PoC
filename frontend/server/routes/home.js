'use strict'
module.exports = function (expressApp){

expressApp.get("/home", handleHomePage );
expressApp.get("/", handleHomePage );

	function handleHomePage(request, response){
		console.log("handleHomePage");
		var msg =  "Home page under construction"
		console.log(msg);
		response.status(200).send(msg);
	}
}
