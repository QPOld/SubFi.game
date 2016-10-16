!function () {
	var io = {
		version : "0.0.0.0.1"
	}
	if (typeof define === "function" && define.amd) {
		this.io = io;
		define(io);
	} else if (typeof module === "object" && module.exports) {
		module.exports = io;
	} else {
		this.io = io;
	}
	
	// Standard xmlHttp get request.
	// Takes in a url and attempts to get information.
	// There are no error handlers yet.
	// This function may be expanded upon in the future.
	io.Get = function (url, callback) {
		var xmlhttp;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
				callback(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	};

	// Standard xmlhttp post request.
	// Takes a url and performs a post request.
	// There are no error handlers yet.
	// The data is in the form
	// "Name=pvp&Value=1"
	// Name and Value are php session variables
	// pvp and 1 are mysql database column id's
	// This function may be expanded upon in the future.
	io.Post = function (url, data, callback) {
		var xmlhttp;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
				callback(xmlhttp.responseText);
			}
		}
		xmlhttp.send(data);
	};
}
();