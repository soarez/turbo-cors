var http = require('http');
var static = require('node-static');

var logRequest = require('./log-request');
var CORS = require('./cors');
var turboCORS = require('./turbo-cors');

var server = http.createServer(onReq);
server.listen(8000);

var fileServer = new static.Server(__dirname + '/public');
var corsHandler = CORS({
  allowedHeaders: [
    'X-Auth-Token'
  ],
  maxAge: 1
});

function onReq(req, res) {

  turboCORS(req);

  logRequest(req);

  if (corsHandler(req, res))
    return;

  if (~req.url.indexOf('/cors')) {
    res.writeHead(204);
    res.end();
    return;
  }

  req.on('end', fileServer.serve.bind(fileServer, req, res));
  if (! req._readableState.flowing) req.resume();
}

