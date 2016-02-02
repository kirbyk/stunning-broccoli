var express = require('express');


var app = express();
app.set('port', (process.env.PORT || 8080));

app.set('view engine', 'jade');


var homeController = require('./controllers/home');

app.get('/', homeController.getHome);

app.get('*', function(req, res) {
  res.sendStatus(404);
});


var server = app.listen(app.get('port'), function () {
  console.log('the server is listening on port %s', app.get('port'));
});
