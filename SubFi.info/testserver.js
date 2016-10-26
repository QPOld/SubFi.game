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
var bodyParser = require('body-parser');
 

console.log(sitePath);
console.log("Starting server in: " + __dirname + '/' + sitePath);
app.use(express.static(__dirname + '/' + sitePath));
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//Helper functions
function isEmpty (obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
			return false;
	}
	return true;
};
app.get('/retrieve',function(req,res){
	var user = req.query['id'];
	var collection = db.get('usercollection');
	collection.find({'username': user},function(err,docs){
		if (err == null) {
			if (!isEmpty(docs)){
				delete docs[0].password;
				delete docs[0].email;
				res.send(docs);
			}
		}
	});
});
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
app.post('/register',function(req,res){
	var email = req.body.email;
	var user = req.body.id;
	var pass = req.body.pass;
	var collection = db.get('usercollection');
	var key = {'username' : user};
	//How to add a new column. The first true is for upsert, i.e. create if doesn't exist, and 
	//the second true is multi, i.e. do it to all docs.
	//collection.update({},{$set:{"newColumnName":newColumnValue}},true,true)
	var data = {
		'username': user,
		'password':pass,
		'email':email,
		'level':1,
		'experience':0,
		'intelligence':5,
		'dexterity':5,
		'strength':5,
		'consitution':5,
		'focus':5, 
		'points':0 ,
		'itemrank':0,
		'battlerank':0,
		'kills':0,
		'deaths':0,
		'leaves':0,
		'pvpflag':0,
		'matchID':'',
		'orderID':0,
		'findID':0,
		'attempts':0
		};
	// Make this not callback hell.
	// Create functions or modulize or something.
	// It does work though.
	collection.find({'username':user},function(err,docs){
		if (err == null) {
			if (!isEmpty(docs)){
				res.json({ registered: "false" });
			} else {
				collection.find({'email':email},function(err,docs){
					if (err == null) {
						if (!isEmpty(docs)){
							res.json({ registered: "false" });
						} else {
							collection.update(key, data,{upsert:true},function(err,docs){
								if(err == null){
									res.json({ registered: "true" });
								} else {
									res.json({ registered: "Error" });
								}
							});
						}
					}
				});
			}
		}
	});
});

// Start server
io.on('connection', function(socket){
  console.log('connect');
  socket.on('chat message',function(msg){
	  io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
	  console.log('disconnect');
  });
});
server.listen(port, function() { 
    console.log("Server running at: http://localhost:" + port)
}); 