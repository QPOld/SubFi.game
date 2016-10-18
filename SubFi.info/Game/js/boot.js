/* 
	bootState
	
	Boot is before preload. Any file or phaser functions that must be attached before 
	preload will be in this file.
	
	Notes:
		No physics will be added.
		Plugins will go in the boot file.
		Width and height are defined here for the rest of the game except in the game.js file.
	
	Issues:
		Allow width & height to be in the game.js file and referenced to other files.
 */
var bootState = {
	// Default create function. At this point it just starts the new state called load.
	create: function() {
		game.add.plugin(Fabrique.Plugins.InputField);
		game.state.start('load');
		console.log('bootState Complete.');//Remove on release.
	},
	width:1280,
	height:720,
	
};