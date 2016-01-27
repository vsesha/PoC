'use strict'
var FullRecSet =[];
var PythonShell = require('python-shell');
var spawn 		= require("child_process").spawn;


function getSamplePortfolio(){
	var promise = new Promise(function(resolve, reject) {	
	var samplePortfolio = [
				  {Portfolio: 'ABC-123', InstrumentID: 'FMRV-14USAA', Quantity: 10037, FinType: 'FUTURES',},
				  {Portfolio: 'XYZ-211', InstrumentID: 'IBM-USAA', Quantity: 8802, FinType: 'FUTURES'},
				  {Portfolio: 'PQR-727', InstrumentID: 'FMRV-14USAA', Quantity: -9200, FinType: 'IRS'},
				  {Portfolio: 'WEE-338', InstrumentID: 'FMRV-14USAA', Quantity: 5860, FinType: 'IRS'},
				  {Portfolio: 'SHB-466', InstrumentID: 'FMRV-14USAA', Quantity: -3900, FinType: 'IRS'},
				];
			resolve(samplePortfolio);	
		});
	return promise;
};

function getMarginsErrors(){
	var promise = new Promise(function(resolve, reject) {	
	var sampleErrdPortfolio = [
				  	{Portfolio: 'ABC-123', Error: 'Instrument FMV-14USAA not found'},
					{Portfolio: 'JAN-342', Error: 'Account inactive'},
					{Portfolio: 'ABC-123', Error: 'Instrument IIB-USAA not found'},
					{Portfolio: 'YHA-029', Error: 'Invalid Date'}, 	 			
					{Portfolio: 'XYZ-961', Error: 'Instrument XX-14USAA not found'},
		  			];
			resolve(sampleErrdPortfolio);	
		});
	return promise;
};

function getMarginsforPortfolio(portfolios){
	var promise = CalculateMargins(portfolios);
	return promise;
};

function CalculateMargins(inputData){
	
	var promise = new Promise(function(resolve, reject) {
		try{

			var inputData = [
			  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'FMRV-14USAA', Quantity: 100, FinType: 'FUTURES'},
			  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'IBM-USAA', Quantity: 1050, FinType: 'FUTURES'},
			  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'FMRV-14USAA', Quantity: 100, FinType: 'IRS'},
			  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'FMRV-14USAA', Quantity: 100, FinType: 'IRS'},
			  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'FMRV-14USAA', Quantity: 100, FinType: 'IRS'},
			];

			var process = spawn('python',["../Core/CalcEngine.py", inputData]);
			process.stdout.on('data', function (data){
				resolve(data);	
			});	
		}

		catch (err){
			console.log("error ="+err);
			reject(err);
		}
	});
	return promise;
};


module.exports.getMarginsforPortfolio 	= getMarginsforPortfolio;
module.exports.getPortfolio 			= getSamplePortfolio;
module.exports.getMarginsErrors 		= getMarginsErrors;