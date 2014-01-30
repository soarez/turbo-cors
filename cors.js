module.exports = cors;

function cors(opts) {
  if (! opts) opts = {};
  var allowOrigin = opts.origin || '*';
  var allowCredentials = opts.allowCredentials;
  var exposeHeaders = opts.exposeHeaders || '';
  var allowedMethods = opts.allowedMethods || 'GET, POST, PUT, DELETE, OPTIONS';
  var allowedHeaders = opts.allowedHeaders || '';
  var maxAge = opts.maxAge;

  return function(req, res) {
    if (! req.headers.origin)
      return;

    res.setHeader('Access-Control-Allow-Origin', allowOrigin);

    if (allowCredentials)
      res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method !== 'OPTIONS' || !req.headers['access-control-request-method']) {
      res.setHeader('Access-Control-Expose-Headers', exposeHeaders);
      return;
    }

    res.setHeader('Access-Control-Allow-Methods', allowedMethods);
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders);

    if (maxAge)
      res.setHeader('Access-Control-Max-Age', maxAge);

    res.writeHead(200);
    res.end();
    return true;
  };
}

