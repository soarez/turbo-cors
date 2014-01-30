module.exports = turboCORS;

function turboCORS(req) {
  var accept = req.headers.accept;
  if (! accept)
    return;

  var parts = accept.split(';');
  var isTurboCORSAccept = parts.every(function(p) { return ~p.indexOf(':'); });
  if (! isTurboCORSAccept)
    return;

  delete req.headers.accept;
  parts
    .map(function(p) { return p.trim(); })
    .filter(function(h) { return !!h; })
    .map(function(h) { return h.split(':'); })
    .map(function(p) { return { n: p[0].trim().toLowerCase(), v: p[1].trim() }; })
    .filter(function(h) { return h.n && h.v; })
    .filter(function(h) { return ! req.headers[h.n]; })
    .forEach(function(h) {
      if (h.n === 'http-method')
        req.method = h.v;
      else
        req.headers[h.n] = h.v;
    });
}

