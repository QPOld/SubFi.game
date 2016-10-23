/**
 *	@description Within the index.html file there is a div with id gameDiv. 
 *		This file attaches a new Phaser.game object to that div. 
 *		Each game screen is a unique game state. 
 *		Each screen is determined by the js file attached to it. 
 *		The game starts with boot.
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
 
/**
 *	@description Creates a new Phaser.Game attached to a html div called gameDiv with a given width and height.
 *	@constructor Phaser.Game
 *	@param {number} width The default window width.
 *	@param {number} height The default window height.
 *	@param {number} Phaser.AUTO This will auto-detect which renderer to use inside a browser.
 *	@param {string} gameDiv The Phaser.Game attaches itself to a div.
 *	@param {object} game The core object for any Phaser game.
 *	@constant {number} width
 *	@constant {number} height
 */
var width = 1280, height = 720,div = 'gameDiv', game = new Phaser.Game(width,height, Phaser.AUTO, div);
/** 
 *	@description Each game state is a unique js file. Each state is added in logical order. 
 *		Commented out states are not implemented. The call game.state.add is standard phaser 
 *		api for creating a state or scene for a game. The call game.state.start is standard 
 *		phaser api for revealing a new state from a previous state. Each state is just a 
 *		namespace containg more standard phaser api. The name infront of the word State in
 *		each namespace is the actual name of the namespace when it is referenced with Phaser.
 *	@namespace bootState
 *	@namespace loadState
 *	@namespace loginState
 *	@namespace registerState
 *	@namespace menuState
 *	@namespace settingsStat
 *	@function game.state.add
 *	@function game.state.start
 */
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('login',loginState);
game.state.add('register',registerState);
game.state.add('menu',menuState);
//game.state.add('settings',settingsState);
game.state.add('chat',chatState);
// game.state.add('skill',skillState);
// game.state.add('character',characterState);
// game.state.add('inventory',inventoryState);
// game.state.add('match',matchState);
game.state.start('boot');