/**
 *	@description Any file or phaser function that must be attached before 
 *		the assets are loaded will be in this file. As of right now the 
 *		width, height, and user object are defined here.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
 
/**
 *	@namespace bootState
 */
var bootState = {
	
	/**
	 *	@description Reserved name in Phaser.
	 *
	 *	@memberof bootState
	 *
	 *	@function create
	 */
	create: function() {
		/** @see game.js */
		game.state.start('load');
		console.log('bootState Complete.'); // Remove upon release.
	},
	
	/**
	 *	@description Default screen width for the client.
	 *
	 *	@memberof bootState
	 *
	 *	@constant {number} width
	 */
	width:1280,
	
	/**
	 *	@description Default screen height for the client.
	 *
	 *	@memberof bootState
	 *
	 *	@constant {number} height
	 */
	height:720,
	
	/**
	 *	@description Stores the name of the connected user. This allows the user's name to be a global variable
	 *		such that it can be referenced for server api. Nothing else about the user will be stored globally.
	 *
	 *	@memberof bootState
	 *
	 *	@constant {object} user	
	 */
	 user:{},
	
}; //End of bootState.