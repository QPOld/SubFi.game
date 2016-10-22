/**
 *	
 *	@description Any file or phaser function that must be attached before 
 *		the aseets are loaded will be in this file. As of right now the width and height are defined here.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 *
 *	@todo Put width and height into the game.js file.
 */
/**
 *	@namespace bootState
 */
var bootState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof bootState
	 *	@function create
	 */
	create: function() {
		/**
		 *	@function game.add.plugin
	     *	@param {function} Fabrique.Plugins.InputField Plugin for phaser that create html like input fields.
		 *	@function game.state.start
		 */
		game.add.plugin(Fabrique.Plugins.InputField);
		/** @see game.js */
		game.state.start('load');
		console.log('bootState Complete.'); // Remove upon release.
	},
	/**
	 *	@description Default screen width for the client.
	 *	@memberof bootState
	 *	@param {number} width The default screen width.
	 *	
	 */
	width:1280,
	/**
	 *	@description Default screen height for the client.
	 *	@memberof bootState
	 *	@param {number} height The default screen height.
	 *	
	 */
	height:720,
	
}; //End of bootState.