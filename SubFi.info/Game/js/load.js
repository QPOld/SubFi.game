/**
 *	@description Anything that is loaded into the memory cache for the game will be in this file.
 *		Every screen has its own function to load the necessary assets.
 *		Assets will be reused but are loaded within the first time screen.
 *		i.e. the first screen to show it will load it.
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 *	@todo The init function may need some additional work to fix all full screen issues.
 */
/**
 *	@namespace loadState
 */
var loadState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof loadState
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
	 *	@memberof loadState
	 *	@function create
	 */
	create: function(){
		/**	@see boot.js */
		game.state.start('login');
		console.log('loadState Complete.'); // Remove upon release.
	},
	/**
	 *	@description Initialization function for the entire game. All default client 
	 *		side game options will be initiated within this function.
	 *	@memberof loadState
	 *	@function init
	 */
	init: function() {
		/**	Restricts right clicking on the screen.*/
		game.canvas.oncontextmenu = function () {return false};
		/**	A scale mode that shows the entire game while maintaining proportions. */
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		/** Forces the minimum width of the game screen to be the predefined default width. {@see bootState#width} */
		game.scale.minWidth = bootState.width;
		/** Forces the minimum height of the game screen to be the predefined default height. {@see bootState#height} */
		game.scale.minHeight = bootState.height;
		/** Forces the maximum width of the game screen to be the predefined default width. {@see bootState#width} */
		game.scale.maxWidth = bootState.width;
		/** Forces the maximum height of the game screen to be the predefined default height. {@see bootState#height} */
		game.scale.maxHeight = bootState.height;
		/** Aligns the page horizontally to the center of the screen. */
		game.scale.pageAlignHorizontally = true;
		/** Aligns the page vertically to the center of the screen. */
		game.scale.pageAlignVertically = true;
		/** 
		 *	@param {number} innerWidth Defines the canvas width.
		 */
		game.canvas.style.width = window.innerWidth+"px";
		/** 
		 *	@description The -1 comes from a clipping issue on most browers where a single pixel
		 *		line is missing from the height. This is a hacky solution to a strange problem
		 *		brought up on the Phaser development forums.
		 *	@param {number} innerHeight Defines the canvas height.
		 */
		game.canvas.style.height= window.innerHeight-1+"px";
		/** Resets all internal variables.*/
		game.scale.refresh();
	},
	/**
	 *	@description Adds text and images to the screen while the game is loading assets. Right now the game
	 *		loads quickly essentially making the loading screen non existent. As the game grows in complexity
	 *		this screen will become very useful.
	 *	@memberof loadState
	 *	@function loadingScreen
	 *	@todo Create an awesome animation for the loading screen.
	 */
	loadingScreen: function(){
		var loadingLabel = game.add.text(bootState.width/2,bootState.height/2,'Loading...',{font:'30px Courier'})
	},
	/**
	 *	@description Loads the background image for the login screen. The input forms for the 
	 *		loginscreen may be reworked to be pure html and styled in css. This will remove the 
	 *		need for button assets for the login form only. Other in game buttons will remain
	 *		as assets to the game.
	 *	@memberof loadState
	 *	@function loginScreen
	 */
	loginScreen: function(){
		game.load.image('loginBackgroundScreen','../assets/loginBackgroundScreen.png');
		game.load.image('submitButton', '../assets/submitButton.png')
		game.load.image('registerButton', '../assets/registerButton.png')
	},
	/**
	 *	@memberof loadState
	 *	@function registerScreen
	 */
	registerScreen: function(){
		game.load.image('registerBackgroundScreen','../assets/registerBackgroundScreen.png');
	},
	/**
	 *	@description The main game screen. The entire game will run off of users interacting
	 *		with the main screen. All buttons will be assets and not html/css.
	 *	@memberof loadState
	 *	@function mainScreen
	 */
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
	/**
	 *	@memberof loadState
	 *	@function settingsScreen
	 */
	settingsScreen: function(){
		game.load.image('settingsBackgroundScreen', '../assets/settingsBackgroundScreen.png');
		game.load.image('backButton', '../assets/backButton.png');
	},
	/**
	 *	@memberof loadState
	 *	@function chatScreen
	 */
	chatScreen: function(){},
	/**
	 *	@memberof loadState
	 *	@function skillScreen
	 */
	skillScreen: function(){},
	/**
	 *	@memberof loadState
	 *	@function inventoryScreen
	 */
	inventoryScreen: function(){},
	/**
	 *	@memberof loadState
	 *	@function matchScreen
	 */
	matchScreen: function(){},
} // End of loadState