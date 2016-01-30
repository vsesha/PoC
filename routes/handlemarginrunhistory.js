'use strict'
module.exports = function (expressApp){
console.log("registring marg hist");
var marginhistroyData = require('../data/MarginRunHistory');
	
expressApp.get('/getmarginrunhistory', 		handleGetMarginHistory );	
expressApp.post('/addmarginhistory', 		handleAddMargHistory );

	function handleGetMarginHistory(request, response){
			marginhistroyData.getFromHistory().then(function(data){
			response.status(200).send(data)
		},function(err){
			response.status(500).send(err)
		});
	}

	function handleAddMargHistory(request, response){
		marginhistroyData.addtoHistory(request.body).then(function(data){
			response.status(200).send(data)
			},function(err){response.status(500).send(err)}
		);
	}
}