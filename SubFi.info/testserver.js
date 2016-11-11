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
var config = require('./config.js')
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.db.development);
var bodyParser = require('body-parser');
var async = require('async');
var nodemailer = require('nodemailer');
var favicon = require('serve-favicon');

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
// app.use(app.use(favicon(__dirname + config.favicon.path)));
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
app.post('/forgot',function(req, res){
	var email = req.body.email;
	var collection = db.get('usercollection');
	var key = {'email' : email};
	//ADD TRANSPORTER HERE
	// FIND A WAY TO NOT SHOW LOGIN INFO
	var transporter = nodemailer.createTransport('smtps://'+config.mailer.auth.user+'%40gmail.com:'+config.mailer.auth.pass+'@smtp.gmail.com');
	async.waterfall([
		function(callback){
			////find user
			collection.find(key,function(err,docs){
				if (err == null) {
					if (!isEmpty(docs)){
						res.json({ forgot: "true" });
						callback(null,docs[0].email,docs[0].username,docs[0].password);
					} else {
						res.json({ forgot: "false" });
						callback(false,'','','')
					}
				}
			}); // end of find user.
		},
		function(email,username,password,callback){
			if(email != ''){
				////send mail with defined transport object
				config.mailer.supportHtml();
				var mailOptions = {
					from: config.mailer.defaultFromAddress, // sender address
					to: email, // list of receivers
					subject: 'Requested Account Information', // Subject line
					html: config.mailer.supportHtml(email,username,password)
				};
				transporter.sendMail(mailOptions, function(error, info){
					if(error){
						console.log(error)
						callback(false);
					} else {
						callback(null,'done');
					}
				});
			} else {
				callback(false);
			}
			
		},
	],
	function(err,results){
		if(err == false){
			console.log('yep');
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
	async.series([
		function(callback){
			// find user
			collection.find({'username':user},function(err,docs){
				if (err == null) {
					if (!isEmpty(docs)){
						res.json({ registered: "false" });
						callback(false);
					} else {
						callback();
					}
				}
				
			}) // end of find user.
		},
		function(callback){
			// find email.
			collection.find({'email':email},function(err,docs){
				if (err == null) {
					if (!isEmpty(docs)){
						res.json({ registered: "false" });
						callback(false);
					} else {
						callback();
					}
				}
				
			}) // end of find email.
		},
		//create user.
		function(callback){
			collection.update(key, data,{upsert:true},function(err,docs){
				if(err == null){
					res.json({ registered: "true" });
					callback();
				} else {
					res.json({ registered: "Error" });
					callback(false);
				}
			}) // end of create user.
		},
		
	],
	function(err){
		if(err == false){
			console.log('yep');
		}
	});
	
}); // End of /register.
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