/* 
	loadState
	
	Anything that is loaded into the memory cache for the game will be in this file.
	Every screen has its own function to load the necessary assets.
	Assets will be reused but are loaded within the first time screen.
	i.e. the first screen to show it will load it.
	
	Notes:
		add in generic background for every state.
 */
var loadState = {
	preload: function(){
		loadState.loadingScreen();
		loadState.init();
		loadState.loginScreen();
		loadState.mainScreen();
		loadState.settingsScreen();
		loadState.chatScreen();
		loadState.skillScreen();
		loadState.inventoryScreen();
		loadState.matchScreen();
	},
	create: function(){
		game.state.start('login');
		console.log('loadState Complete.');
	},
	width:bootState.width,
	height:bootState.height,
	init: function() {
		game.canvas.oncontextmenu = function () {return false}
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