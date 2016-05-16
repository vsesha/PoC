var express = require('express');
var app     = express();
var _ENV;
app.set('port', (process.env.PORT || 5000));

if (process.argv.length<3){
	console.log("too few parameters");
 	process.exit();
}

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

app.use(express.static(__dirname + '/app'));


app.get('/', function(request, response) {
    var result = 'Margins App is running'
    response.send(result);
});


app.listen(app.get('port'), function() {
  console.log('Margins app is running in Environment: '+_ENV+' on port: ', app.get('port'));
});