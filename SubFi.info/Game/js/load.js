/**
 *	@description Anything that is loaded into the memory cache for the game will be in this file.
 *		Every screen has its own function to load the necessary assets.
 *		Assets will be reused but are loaded within the first time screen.
 *		i.e. the first screen to show it will load it.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 *
 *	@todo The init function may need some additional work to fix all full screen issues.
 */
/**
 *	@namespace loadState
 */
var loadState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberOf loadState
	 *	@function preload
	 */
	preload: function(){
		/**
		 *	@description All loadState functions will be called in the preload function.
		 *	@function loadState.loadingScreen
		 *	@function loadState.init
		 *	@function loadState.loginScreen
		 *	@function loadState.registerScreen
		 *	@function loadState.mainScreen
		 *	@function loadState.settingsScreen
		 *	@function loadState.chatScreen
		 *	@function loadState.skillScreen
		 *	@function loadState.inventoryScreen
		 *	@function loadState.matchScreen
		 */
		loadState.loadingScreen();
		loadState.init();
		loadState.loginScreen();
		loadState.registerScreen();
		loadState.mainScreen();
		loadState.settingsScreen();
		loadState.chatScreen();
		loadState.skillScreen();
		loadState.inventoryScreen();
		loadState.matchScreen();
	},
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberOf loadState
	 *	@function create
	 */
	create: function(){
		game.state.start('login');
		console.log('loadState Complete.'); // Remove upon release.
	},
	/** Width is defined with the bootstate namespace {@see bootState}. */
	width:bootState.width,
	height:bootState.height,
	/**
	 *	@description Initialization function for the entire game. All default client 
	 *		side game options will be initiated within this function.
	 *	@memberOf loadState
	 *	@function init
	 */
	init: function() {
		/** Restricts right clicking on the screen.*/
		game.canvas.oncontextmenu = function () {return false};
		//////// LEFT OFF HERE ////////
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.minWidth = loadState.width;
		game.scale.minHeight = loadState.height;
		game.scale.maxWidth = loadState.width;
		game.scale.maxHeight = loadState.height;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.canvas.style.width = window.innerWidth+"px";
		game.canvas.style.height= window.innerHeight-1+"px";
		game.scale.refresh();
	},
	loadingScreen: function(){
		var loadingLabel = game.add.text(loadState.width/2,loadState.height/2,'Loading...',{font:'30px Courier'})
	},
	loginScreen: function(){
		game.load.image('loginBackgroundScreen','../assets/loginBackgroundScreen.png');
		game.load.image('submitButton', '../assets/submitButton.png')
		game.load.image('registerButton', '../assets/registerButton.png')
	},
	registerScreen: function(){
		game.load.image('registerBackgroundScreen','../assets/registerBackgroundScreen.png');
	},
	mainScreen: function() {
		game.load.image('mainBackgroundScreen', '../assets/mainBackgroundScreen.png');
		game.load.image('fullScreenButton', '../assets/fullScreenButton.png');
		game.load.image('settingsButton', '../assets/settingsButton.png');
		game.load.image('matchButton', '../assets/matchButton.png');
		game.load.image('chatButton', '../assets/chatButton.png');
		game.load.image('skillButton', '../assets/skillButton.png');
		game.load.image('inventoryButton', '../assets/inventoryButton.png');
		game.load.image('rankButton', '../assets/rankButton.png');
		game.load.image('characterButton', '../assets/characterButton.png')
	},
	settingsScreen: function(){
		game.load.image('settingsBackgroundScreen', '../assets/settingsBackgroundScreen.png');
		game.load.image('backButton', '../assets/backButton.png');
	},
	chatScreen: function(){},
	skillScreen: function(){},
	inventoryScreen: function(){},
	matchScreen: function(){},
}