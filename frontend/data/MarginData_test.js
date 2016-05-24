'use strict'
var FullRecSet =[];
var PythonShell = require('python-shell');

/*var mongoose	= require('mongoose');
mongoose.connect('mongodb://localhost/MarginsPOCDB');

var MarginsSchema = new mongoose.Schema({
	Account:		String,
	Currency:		String,
	InitialMargin:	{type:String, default:'0000'}
},{collection:"MarginPortfolio"});

var MarginModel = mongoose.model("MarginModel",MarginsSchema);*/


function getDummyPortfolio(){
	var promise = new Promise(function(resolve, reject) {
		
		});
	return promise;
};

function getMarginsforPortfolio(portfolios){
	var promise = new Promise(function(resolve, reject) {
			var data = calculateMargins();
			resolve(data);			
		});
	return promise;
};

function calculateMargins()
{
	console.log("inside calculateMargins()");
	var inputData = [
      {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'FMRV-14USAA', Quantity: 100, FinType: 'FUTURES'},
	  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'IBM-USAA', Quantity: 1050, FinType: 'FUTURES'},
	  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'FMRV-14USAA', Quantity: 100, FinType: 'IRS'},
	  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'FMRV-14USAA', Quantity: 100, FinType: 'IRS'},
	  {Portfolio: 'SSHB-DRV-CEFL', InstrumentID: 'FMRV-14USAA', Quantity: 100, FinType: 'IRS'},
    ];
	console.log("A.1");
	var options = {
	  mode: 'json',
	  pythonPath: '/usr/bin/python',
	  //pythonOptions: ['-u'],
	  scriptPath: '../Core/',
	  args: [inputData]
	};
	console.log("A.2");
	try{
		var pyshell = new PythonShell('../Core/CalcEngine.py',options);

		// sends a message to the Python script via stdin 
		pyshell.send(inputData);

		pyshell.on('message', function (message) {
		  // received a message sent from the Python script (a simple "print" statement) 
		  console.log(message);
		});
	}
	/*try
	{
		PythonShell.run('./CalcEngine.py', options, function (err, results) {
		  if (err) {
			  console.log("A.3");
			  console.log("Error ="+err);  
		  };
			console.log("A.4");
		  // results is an array consisting of messages collected during execution 
			console.log('results: %j', results);
			console.log("A.5");
			return results;
		});
	}*/
	catch (err){
		console.log("error ="+err);
	}
	/*var dummyResultset = [
		{Account: 'CDRG-FRM1-CEFL', Currency: 'USD', IM: 73223},
	  	{Account: 'CDRG-FRM2-CEFL', Currency: 'USD', IM: 42242},
		{Account: 'ABC-FRM-XYZ', Currency: 'USD', IM: 937363},
		{Account: 'DEF-FRM-PQR', Currency: 'USD', IM: 14132},
    ];
	return dummyResultset;	*/
}

module.exports.getMarginsforPortfolio 	= getMarginsforPortfolio;
module.exports.getPortfolio 			= getDummyPortfolio;
