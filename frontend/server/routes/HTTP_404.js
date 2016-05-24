'use strict'
module.exports = function (expressApp){

expressApp.get("*", handleHTTP_404Page );

	function handleHTTP_404Page(request, response){
		console.log("handleHTTP_404Page");
		var msg =  "HTTP ERROR 404 - Page Not found"
		console.log(msg);
		response.status(404).send(msg);
	}
}
