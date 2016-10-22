/**
 *	@description Cloth is a html element generator. The main function appends an element
 *		type to a parent element with inline attributes.
 *	@module cloth
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
!function () {
	/** cloth object containing the current version number.*/
	var cloth = {
		version : "1.0.0"
	},
	cloth_document = this.document; // cloth_document can just be replaced.
	/**I legit took this from d3.js and made it work for me.*/
	if (typeof define === "function" && define.amd) {
		this.cloth = cloth;
		define(cloth);
	} else if (typeof module === "object" && module.exports) {
		module.exports = cloth;
	} else {
		this.cloth = cloth;
	}

	/**
	 *	@description Sets CSS attributes for a html element.
	 *		Loops through all the keys in the attrs object 
	 *		and uses the method element.setAttribute.
	 *		Invalid keys and attributes are ignored.
	 *	@function setAttributes
	 *	@param {element} element The html element that is being created.
	 *	@param {object} attrs The attribute object. This contains any 
	 *		inline parameters. I suggest containing the id parameter.
	 *	@tutorial setAttributes(elementID, {'id' : elememtID,'type' : elementType});
	 */
	function setAttributes(element, attrs) {
		for (var key in attrs) {
			element.setAttribute(key, attrs[key]);
		}
	};
	/**
	 *	@description The main function for cloth.js. Append takes in the 
	 *		parentID html element then adds in an element of type 
	 *		ElementID with attributes attrs. If the parent does not exist
	 *		then the elementID is attached to the body.
	 *	@memberof cloth
	 *	@function append
	 *	@param {string} parentID The name of the parent html element.
	 *	@param {string} elementType The html element type that is appened to parent html element.
	 *	@param {object} attrs The attribute object {@see cloth#setAttributes}.
	 *	@tutorial cloth.append('exampleDiv', 'input', attrs={ 'id' : 'exampleID', 'type' : 'submit', 'value' : 'Login'});
	 */
	cloth.append = function(parentID, elementType, attrs) {
		parentID = cloth_document.getElementById(parentID);
		if (parentID === undefined || parentID === null) {
			parentID = cloth_document.createElement(elementType);
			setAttributes(parentID, attrs);
			cloth_document.body.appendChild(parentID);
		} else {
			elementType = cloth_document.createElement(elementType);
			setAttributes(elementType, attrs);
			parentID.appendChild(elementType);
		}
	};
	/**
	 *	@description An element created with cloth.append {@see cloth#append} with an id given in the attrs object
	 *		can be removed with this function. If the element does not exist then
	 *		nothing happens. Any html element created with cloth.append should have an input
	 *		have an 'id' in the attrs object.
	 *	@memberof cloth
	 *	@function remove
	 *	@param {string} elementID The name of the html element that will be removed.
	 *	@tutorial cloth.remove('exampleID');
	 */
	cloth.remove = function(elementID) {
		var elem = cloth_document.getElementById(elementID);
		if (elem != null) {
			elem.parentNode.removeChild(elem);
		}
	};
	
	/**
	 *	@description Retrieve a value from an element with an id. If the value does not exist
	 *		then null is returned instead of the value.
	 *	@memberof cloth
	 *	@function retrieve
	 *	@param {string} elementID The name of the html element.
	 *	@returns {number}
	 *	@tutorial cloth.retrieve('exampleID');
	 */
	cloth.retrieve = function(elementID) {
		var elem = cloth_document.getElementById(elementID);
		if (elem != null) {
			return elem.value;
		} else {
			return null;
		}
	};
	
	/**
	 *	@description Changes the focus to a html element with an id of elementID.
	 *	@memberof cloth
	 *	@function focus
	 *	@param {string} ElementID The name of the html element.
	 *	@tutorial cloth.focus('exampleID');
	 */
	cloth.focus = function(elementID){
		var elem = cloth_document.getElementById(elementID);
		if (elem != null) {
			elem.focus()
		}
			
	};
}
();