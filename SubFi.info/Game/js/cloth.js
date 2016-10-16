!function () {
	/*	Global Variables */
	var cloth = {
		version : "0.0.0.0.8"
	},
	cloth_document = this.document;
	// AMD and Module Support
	// This may be removed. Its copied from d3.
	if (typeof define === "function" && define.amd) {
		this.cloth = cloth;
		define(cloth);
	} else if (typeof module === "object" && module.exports) {
		module.exports = cloth;
	} else {
		this.cloth = cloth;
	}
	
	// Sets CSS attributes for a html element.
	// Loops through all the keys in attrs and uses element.setAttribute.
	// Invalid keys and attributes are ignored.
	// The attrs variable has the form
	//	{
	//		'id':'elementID',
	//		'type' : 'submit',
	//		'example' : 'value',
	//	}
	function setAttributes(element, attrs) {
		for (var key in attrs) {
			element.setAttribute(key, attrs[key]);
		}
	};
	
	// Takes in the parent html element then adds in ElementID with attributes attrs.
	// If the parent does not exist then the elementID is attached to the body.
	// Again the attrs is of the form:
	//	{ 'id' : 'exampleID',}
	// appendElementWithID('parentDiv', 'elementType', attrs={
	// 		'id' : 'elementID',
	// 		'style' : '\
	// 			position:relative;\
	// 			font-size:36px;\
	// 			border-radius:14px;\
	// 			width:25px;\
	// 			height:25px;\
	// 			background-color:gray;\
	// 			margin:0px auto;'
	//});
	cloth.append = function(parentDiv, elementType, attrs) {
		parentDiv = cloth_document.getElementById(parentDiv);
		if (parentDiv === undefined || parentDiv === null) {
			parentDiv = cloth_document.createElement(elementType);
			setAttributes(parentDiv, attrs);
			cloth_document.body.appendChild(parentDiv);
		} else {
			elementType = cloth_document.createElement(elementType);
			setAttributes(elementType, attrs);
			parentDiv.appendChild(elementType);
		}
	};

	// An element created with appendElementWithID with attrs {'id' : 'elementID',}
	// can be removed with this function. If the element does not exist then
	// nothing happens. Through out the code all html/css input has an 'id' in the attrs.
	cloth.remove = function(elementID) {
		var elem = cloth_document.getElementById(elementID);
		if (elem !== null || elem !== undefined) {
			elem.parentNode.removeChild(elem);
		}
	};
}();