'use strict'
module.exports = function (expressApp){
console.log("registring get margins");
var marginData = require('../data/MarginData');
	
expressApp.get('/getportfolio', 		handleGetPortfolio );	
expressApp.get('/getmargins', 			handleMarginsforPortfolio );
expressApp.get('/getmarginerrors', 		handleMarginsErrors );	
	

	function handleGetPortfolio(request, response){
			marginData.getPortfolio().then(function(data){
			response.status(200).send(data)
		},function(err){
			response.status(500).send(err)
		});
	}
	
	function handleMarginsforPortfolio(request, response){
		console.log("1");
			marginData.getMarginsforPortfolio().then(function(data){
			response.status(200).send(data)
		},function(err){
			response.status(500).send(err)
		});
	}
	
	function handleMarginsErrors(request, response){
		console.log("1");
			marginData.getMarginsErrors().then(function(data){
			response.status(200).send(data)
		},function(err){
			response.status(500).send(err)
		});
	}


}
