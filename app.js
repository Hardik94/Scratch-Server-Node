var express = require('express');
var app = express();
var routerSample = require('./Operations')

// var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(function timeLog (req, res, next) {
  console.log('Main Server Request: ', Date.now())
  next()
})


app.use('/', routerSample)


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
