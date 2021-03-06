var tls = require('tls');
var fs = require('fs');
var debug = require('debug');

var options = {
  key: fs.readFileSync(__dirname+'/certs/tlsecho.com.key'),
  cert: fs.readFileSync(__dirname+'/certs/tlsecho.com.cert')

  /*// This is necessary only if using the client certificate authentication.
  requestCert: true,

  // This is necessary only if the client uses the self-signed certificate.
  ca: [ fs.readFileSync('client-cert.pem') ]*/
};



exports.start = function(port){
  var server = tls.createServer(options, function(cleartextStream) {
    cleartextStream.setEncoding('utf8');
    cleartextStream.pipe(cleartextStream);
  });

  port = port || 8000;
  server.listen(port, function() {
    debug('tls echo server started on port '+ port);
  });

return server;
}
