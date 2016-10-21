!function () {
	var cloth = {
		version : "1"
	},
	cloth_document = this.document;
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
	//	{'id' : 'exampleID',
	//   'type' : 'submit',
	//	 'value' : 'Accept',}
	cloth.append = function(parent, elementID, attrs) {
		parent = cloth_document.getElementById(parent);
		if (parent === undefined || parent === null) {
			parent = cloth_document.createElement(elementID);
			setAttributes(parent, attrs);
			cloth_document.body.appendChild(parent);
		} else {
			elementID = cloth_document.createElement(elementID);
			setAttributes(elementID, attrs);
			parent.appendChild(elementID);
		}
	};

	// An element created with appendElementWithID with attrs {'id' : 'elementID',}
	// can be removed with this function. If the element does not exist then
	// nothing happens. Through out the code all html/css input has an 'id' in the attrs.
	cloth.remove = function(elementID) {
		var elem = cloth_document.getElementById(elementID);
		if (elem != null) {
			elem.parentNode.removeChild(elem);
		}
	};
	
	// Retrieve Value from element with an id.
	cloth.retrieve = function(elementID) {
		var elem = cloth_document.getElementById(elementID);
		if (elem != null) {
			return elem.value;
		} else {
			return null;
		}
	};
}
();