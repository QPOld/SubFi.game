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
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/userInfo');
 
// Start server
console.log(sitePath);
console.log("Starting server in: " + __dirname + '/' + sitePath);
app.use(express.static(__dirname + '/' + sitePath));
app.use(function(req,res,next){
    req.db = db;
    next();
});
//Helper functions
function isEmpty (obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
			return false;
	}
	return true;
};
//gets
app.get('/login',function(req,res){
	var user = req.query['id'];
	var pass = req.query['pass'];
	var collection = db.get('usercollection');
	collection.find({'username': user,'password':pass},function(err,docs){
		if (err == null) {
			if (!isEmpty(docs)){
				res.json({ logged: "true" });
			} else {
				res.json({ logged: "false" });
			}
		}
	});
});
io.on('connection', function(socket){
  console.log('connect');
  socket.on('disconnect', function(){
	  console.log('disconnect');
  });
});
server.listen(port, function() { 
    console.log("Server running at: http://localhost:" + port)
}); 