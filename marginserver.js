'use static'
var http 	= require('http');
var express = require('express');
var bodyparser	= require('body-parser')
var logger	= require('morgan');



var forAllPage 			= require('./routes/defaultForAll')
var marginData 			= require('./routes/getmargins')
var marginHistData 		= require('./routes/handlemarginrunhistory')
var home 				= require('./routes/home')
var HTTP_404_ 			= require('./routes/HTTP_404')


var expressApp = express();
	expressApp.set('port', (process.env.SERVER_PORT || 5000));
	expressApp.use(logger("dev"))
	expressApp.use(bodyparser.urlencoded({extended: true}));
	expressApp.use(bodyparser.json());
	forAllPage(expressApp);
	marginData(expressApp);
	marginHistData(expressApp);
	home(expressApp);
	HTTP_404_(expressApp);


//http.createServer (expressApp).listen(port) ;


expressApp.listen(expressApp.get('port'), function() {
  console.log('MarginServer is running on port', expressApp.get('port'));
});