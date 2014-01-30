$('button.std').click(doStd);
$('button.turbo').click(doTurbo);

function stdCORSReq(o, cb) {
  var r = new XMLHttpRequest();
  r.onload = cb;
  r.open(o.method, o.url, true);
  Object.keys(o.headers).forEach(function(k) {
    r.setRequestHeader(k, o.headers[k]);
  });
  r.send(o.body);
}

function turboCORSreq(o, cb) {
  var r = new XMLHttpRequest();
  r.onload = cb;
  r.open(o.body ? 'POST' : 'GET', o.url, true);
  if (! o.headers) o.headers = [];
  var headers = [ 'HTTP-Method: ' + o.method ];
  if (! o.headers.accept)
    headers.push('Accept: */*');
  Object.keys(o.headers).forEach(function(k) {
    headers.push(k + ': ' + o.headers[k]);
  });
  r.setRequestHeader('Accept', headers.join('; '));
  r.send(o.body);
}

function rand() {
  return Math.random().toString().slice(2);
}

function log(t) {
  $('<p>').append($('<code>').text(t)).appendTo('.log');
  if ($('.log p').length > 5)
    $('.log p').first().detach();
}

function doTurbo() {
  var start = Date.now();
  turboCORSreq({
      method: 'PUT',
      url: 'http://turbocors.soarez.com/cors/' + rand(),
      headers: { 'X-Auth-Token': rand() },
      body: 'THIS IS A XHR REQ'
    }, function() {
      var total = (Date.now() - start) / 1000;
      log('Turbo CORS request completed in: ' + total + 's');
  });
}

function doStd() {
  var start = Date.now();
  stdCORSReq({
      method: 'PUT',
      url: 'http://turbocors.soarez.com/cors/' + rand(),
      headers: { 'X-Auth-Token': rand() },
      body: 'THIS IS A XHR REQ'
    }, function() {
      var total = (Date.now() - start) / 1000;
      log('Standard CORS request completed in: ' + total + 's');
  });
}

