/**
 * Prerequisites:
 *  - Node
 *  - Express (npm install express)
 * 
 */
 
// Parameters
var sitePath = process.argv[2] || ".";
var port = 4242;

// Requires
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
 
// Start server
console.log(sitePath);
console.log("Starting server in: " + __dirname + '/' + sitePath);
app.use(express.static(__dirname + '/' + sitePath));
io.on('connection', function(socket){
  console.log('connect');
  socket.on('disconnect', function(){
	  console.log('disconnect');
  });
});
server.listen(port, function() { 
    console.log("Server running at: http://localhost:" + port)
}); 