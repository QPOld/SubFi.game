/**
 *	@description Anything that is loaded into the memory cache for the game will be in this file.
 *		Every screen has its own function to load the necessary assets.
 *		Assets will be reused but are loaded within the state that first uses them.
 *		i.e. The first screen to show it will load it. The reserved name preload is called
 *		before the reserved name create. That is why all of the states are loaded into memory 
 *		in the preload function.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
 
/**
 *	@namespace loadState
 */
var loadState = {
	
	/**
	 *	@description Reserved name in Phaser.
	 *
	 *	@memberof loadState
	 *
	 *	@function preload
	 */
	preload: function(){
		
		/**
		 *	@description All loadState functions will be called in the preload function.
		 *
		 *	@function loadState.loadingScreen
		 *	@function loadState.init
		 *	@function loadState.loginScreen
		 *	@function loadState.registerScreen
		 *	@function loadState.mainScreen
		 *	@function loadState.settingsScreen
		 *	@function loadState.chatScreen
		 *	@function loadState.skillScreen
		 *	@function loadState.inventoryScreen
		 *	@function loadState.characterScreen
		 *	@function loadState.rankScreen
		 *	@function loadState.craftScreen
		 *	@function loadState.tradeScreen
		 *	@function loadState.matchScreen
		 */
		loadState.loadingScreen();
		loadState.init();
		loadState.loginScreen();
		loadState.registerScreen();
		loadState.forgotScreen();
		loadState.mainScreen();
		loadState.settingsScreen();
		loadState.chatScreen();
		loadState.skillScreen();
		loadState.inventoryScreen();
		loadState.characterScreen();
		loadState.rankScreen();
		loadState.craftScreen();
		loadState.tradeScreen();
		loadState.matchScreen();
	},
	
	/**
	 *	@description Reserved name in Phaser.
	 *
	 *	@memberof loadState
	 *
	 *	@function create
	 */
	create: function(){
		/**	@see game.js */
		game.state.start('login');
		console.log('loadState Complete.'); // Remove upon release.
	},
	
	/**
	 *	@description Initialization function for the entire game. All default client 
	 *		side game options will be initiated within this function.
	 *
	 *	@memberof loadState
	 *
	 *	@function init
	 */
	init: function() {
		
		/**	Restricts right clicking on the screen.*/
		game.canvas.oncontextmenu = function () {return false};
		
		/**	A scale mode that shows the entire game while maintaining proportions. */
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		/** Forces the minimum width of the game screen to be the predefined default width. { @see bootState#width} */
		game.scale.minWidth = bootState.width;
		
		/** Forces the minimum height of the game screen to be the predefined default height. { @see bootState#height} */
		game.scale.minHeight = bootState.height;
		
		/** Forces the maximum width of the game screen to be the predefined default width. { @see bootState#width} */
		game.scale.maxWidth = bootState.width;
		
		/** Forces the maximum height of the game screen to be the predefined default height. { @see bootState#height} */
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
		 *		brought up on the Phaser development forums. It's a phaser problem
		 *		I believe.
		 *
		 *	@param {number} innerHeight Defines the canvas height.
		 */
		game.canvas.style.height= window.innerHeight-1+"px";
		
		/** Resets all internal variables.*/
		game.scale.refresh();
	}, // End of loadState.init.
	
	/**
	 *	@description Adds text and images to the screen while the game is loading assets. Right now the game
	 *		loads quickly essentially making the loading screen non existent. As the game grows in complexity
	 *		this screen will become very useful.
	 *
	 *	@memberof loadState
	 *
	 *	@function loadingScreen
	 *
	 *	@todo Create an awesome animation for the loading screen.
	 */
	loadingScreen: function(){
		var loadingLabel = game.add.text(bootState.width/2,bootState.height/2,'Loading...',{font:'30px Courier'})
	}, // End of loadState.loadingScreen.
	
	/**
	 *	@description Loads the background image for the login screen. The input forms for the 
	 *		loginscreen may be reworked to be pure html and styled in css. This will remove the 
	 *		need for button assets for the login form only. Other in game buttons will remain
	 *		as assets to the game.
	 *
	 *	@memberof loadState
	 *
	 *	@function loginScreen
	 */
	loginScreen: function(){
		game.load.image('loginBackgroundScreen','../assets/loginBackgroundScreen.png');
		game.load.image('submitButton', '../assets/submitButton.png')
		game.load.image('registerButton', '../assets/registerButton.png')
		game.load.image('forgotButton', '../assets/forgotButton.png')
		game.load.image('exitProgramButton', '../assets/exitProgramButton.png')
	}, // End of loadState.loginScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function registerScreen
	 */
	registerScreen: function(){
		game.load.image('registerBackgroundScreen','../assets/registerBackgroundScreen.png');
	}, // End of loadState.registerScreen.
	
	/**
	 *	@memberof loadState
	 *
	 *	@function registerScreen
	 */
	forgotScreen: function(){
		game.load.image('forgotBackgroundScreen','../assets/forgotBackgroundScreen.png');
	}, // End of loadState.forgotScreen.
	
	/**
	 *	@description The main game screen. The entire game will run off of users interacting
	 *		with the main screen. All buttons will be assets and not html/css.
	 *
	 *	@memberof loadState
	 *
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
		game.load.image('tradeButton', '../assets/tradeButton.png')
		game.load.image('craftButton', '../assets/craftButton.png')
	}, // End of loadState.mainScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function settingsScreen
	 */
	settingsScreen: function(){
		game.load.image('settingsBackgroundScreen', '../assets/settingsBackgroundScreen.png');
		game.load.image('backButton', '../assets/backButton.png');
		game.load.image('exitGameButton', '../assets/exitGameButton.png');
	}, // End of loadState.settingsScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function chatScreen
	 */
	chatScreen: function(){
		game.load.image('sendButton', '../assets/sendButton.png')
	}, // End of loadState.chatScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function skillScreen
	 */
	skillScreen: function(){
		game.load.image('skillBackgroundScreen', '../assets/skillBackgroundScreen.png');
	}, // End of loadState.skillScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function inventoryScreen
	 */
	inventoryScreen: function(){
		game.load.image('inventoryBackgroundScreen', '../assets/inventoryBackgroundScreen.png');
	}, // End of loadState.inventoryScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function matchScreen
	 */
	matchScreen: function(){
		game.load.image('matchBackgroundScreen', '../assets/matchBackgroundScreen.png');
	}, // End of loadState.matchScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function tradeScreen
	 */
	tradeScreen: function(){
		game.load.image('tradeBackgroundScreen', '../assets/tradeBackgroundScreen.png');
	}, // End of loadState.tradeScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function craftScreen
	 */
	craftScreen: function(){
		game.load.image('craftBackgroundScreen', '../assets/craftBackgroundScreen.png');
	}, // End of loadState.craftScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function rankScreen
	 */
	rankScreen: function(){
		game.load.image('rankBackgroundScreen', '../assets/rankBackgroundScreen.png');
	}, // End of loadState.rankScreen.
	
	/**
	 *
	 *	@memberof loadState
	 *
	 *	@function characterScreen
	 */
	characterScreen: function(){
		game.load.image('characterBackgroundScreen', '../assets/characterBackgroundScreen.png');
		game.load.image('exitButton', '../assets/exitButton.png');
	},// End of loadState.characterScreen.
	
} // End of loadState