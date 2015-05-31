var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.post('/api/api-token-auth', function(req, res) {
  var token = jwt.sign(req.body, 'secret', {expiresInSeconds: 10});
  res.send({
    token: token
  });
});

app.post('/api/api-token-refresh', function(req, res) {
  var decoded = jwt.verify(req.body.token, 'secret');

  res.send({
    token: jwt.sign(decoded, 'secret', {expiresInSeconds: 10})
  });
});

app.get('/api/users', function(req, res) {
  var token = req.headers.authorization.split('Bearer ')[1];
  var decoded = jwt.verify(token, 'secret');
  res.send(decoded);
});


app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});
