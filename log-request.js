module.exports = logRequest;

function logRequest(req) {
  console.log('\n`-----------------');
  console.log(req.method, req.url, req.httpVersion);
  Object.keys(req.headers).forEach(function(k) { console.log('%s: %s', k, req.headers[k]); });
  console.log('\n');
  req.pipe(process.stdout);
}

