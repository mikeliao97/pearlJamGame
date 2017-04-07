var express = require('express');
var path = require('path');

var app = express();

app.get('/', function(req, res) {
  res.send('Hello from the bettingServer');
});


app.listen(process.env.PORT || 3500, function() {
  console.log(`bettingServer is listening on PORT ${process.env.port || 3500}`);
});