!function () {
	var data = {
		version : "1"
	}
	if (typeof define === "function" && define.amd) {
		this.data = data;
		define(data);
	} else if (typeof module === "object" && module.exports) {
		module.exports = data;
	} else {
		this.data = data;
	}
	
	// Standard xmlHttp get request.
	// Takes in a url and attempts to get information.
	// There are no error handlers yet.
	// This function may be expanded upon in the future.
	data.Get = function (url, callback) {
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
	data.Post = function (url, data, callback) {
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