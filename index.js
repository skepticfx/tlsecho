var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./certs/tlsecho.com.key'),
  cert: fs.readFileSync('./certs/tlsecho.com.cert')

  /*// This is necessary only if using the client certificate authentication.
  requestCert: true,

  // This is necessary only if the client uses the self-signed certificate.
  ca: [ fs.readFileSync('client-cert.pem') ]*/
};

var server = tls.createServer(options, function(cleartextStream) {
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
  cleartextStream.on('data', function(data){
    //console.log(data.toString())
  })

});

exports.start = function(port){
  port = port || 8000;
  server.listen(port, function() {
    console.log('tls echo server started on port port');
  });
}