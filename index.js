var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 6000));

app.use(express.static(__dirname + '/'));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'server is running'
    response.send(result);
});


app.listen(app.get('port'), function() {
  console.log('Alternate Margins Server is running on port', app.get('port'));
});