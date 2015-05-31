var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(cors());
app.use(bodyParser.json());

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
