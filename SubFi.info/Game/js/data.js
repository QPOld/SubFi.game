/**
 *	@description Simple get and post functions that interact with the server.
 *	@module data
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 *
 */
!function () {
	/** The data object containing the version number.*/
	var data = {
		version : "1.0.0"
	}
	if (typeof define === "function" && define.amd) {
		this.data = data;
		define(data);
	} else if (typeof module === "object" && module.exports) {
		module.exports = data;
	} else {
		this.data = data;
	}

	/**
	 *	@description Standard xmlHttp get request. Takes in a url and attempts to get information.
	 *	@memberof data
	 *	@function Get
	 *	@param {string} url The url to the server.
	 *	@param {callback} callback The get callback function that is called after the 
	 *		http status is 200.
	 *	@tutorial data.Get('example.com/get?user="suh dude"?pass="yep yeppers"',function(){});
	 *	@todo Create error handling.
	 */
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

	/**
	 *	@description Standard xmlhttp post request. Takes a url and performs a post request.
	 *	@memberof data
	 *	@function Post
	 *	@param {string} The url to the server.
	 *	@param {string} data The data is in the form "Name=pvp&Value=1".
	 *	@param {callback} The callback function that is called after the http status is 200.
	 *	@tutorial data.Post( 'example.com/get?', 'user="suh dude"&pass="yep yeppers"', function(){} );
	 *	@todo Expand the function.
	 */
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
();// End of data.