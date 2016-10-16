/* 
	bootState
	
	Boot is before preload. Any file or phaser functions that must be attached before 
	preload will be in this file.
	
	Notes:
		No physics will be added.
 */
var bootState = {
	// Default create function. At this point it just starts the new state called load.
	create: function() {
		game.add.plugin(Fabrique.Plugins.InputField);
		game.state.start('load');
		console.log('bootState Complete.');
	},
	width:1920,
	height:1080,
	
};