'use static'

var express 	= require('express');
var bodyparser	= require('body-parser')
var logger		= require('morgan');

var forAllPage 			= require('./routes/defaultForAll')
var marginData 			= require('./routes/getmargins')
var marginHistData 		= require('./routes/handlemarginrunhistory')
var home 				= require('./routes/home')
var HTTP_404_ 			= require('./routes/HTTP_404')

var _ENV;

if (process.argv.length<3){
	console.log("Too few parameters. Supply Run Environment");
 	process.exit();
}

_ENV = process.argv[2]. toUpperCase();

if (!(_ENV == "DEV") && !(_ENV=="PROD")){
	console.log("Invalid Environemnt. Possible values DEV or PROD");
 	process.exit();
}
	

module.exports = _ENV;

var expressApp = express();
	expressApp.set('port', (process.env.PORT || 8000));
	console.log("__direname="+__dirname);
	expressApp.use(express.static(__dirname + '/'));
	expressApp.use(express.static(__dirname + '/app'));


	//to avoid  $PORT error when hosting at Heroku
	expressApp.get('/', function(request, response) {
		var result = 'App is running'
		response.send(result);
	});

	
	expressApp.use(logger("dev"))
	expressApp.use(bodyparser.urlencoded({extended: true}));
	expressApp.use(bodyparser.json());
	forAllPage(expressApp);
	marginData(expressApp);
	marginHistData(expressApp);
	home(expressApp);
	HTTP_404_(expressApp);

expressApp.listen(expressApp.get('port'), function() {
  console.log('MarginServer is running on port', expressApp.get('port'));
});