/**
 *	@description The main menu for the entire game. The user will interact with this state to reach every aspect of the game.
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
 /**
  *	@namespace menuState
  */
var menuState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof menuState
	 *	@function create
	 */
	create: function(){
		menuState.getUserData();
		
		console.log('menuState Complete.'); //Remove upon release.
	},
	/**
	 *	@description menuScreen contains all of the buttons and tileSprites. The function is called in a succesful callback
	 *		from the { @see menuState#getUserData} function.
	 *	@see bootState.js
	 *	@memberof menuState
	 *	@function menuScreen
	 */
	menuScreen: function () {
		console.log(bootState.user)
		var width = bootState.width;
		var height = bootState.height;
		var mainBackgroundScreen = game.add.tileSprite(0, 0, width, height, 'mainBackgroundScreen');
		var fullScreenButton = game.add.button(width - 72, 28, 'fullScreenButton', menuState.goFullScreen, this, 2, 1, 0);
		var settingsButton = game.add.button(width - 144, 28, 'settingsButton',menuState.goToSettingsScreen , this, 2, 1, 0);
		var chatButton = game.add.button(width - 216, 28, 'chatButton', menuState.goToChatScreen, this, 2, 1, 0);
		var skillButton = game.add.button(width - 288, 28, 'skillButton',menuState.goToSkillScreen, this, 2, 1, 0);
		var matchButton = game.add.button(15, 15, 'matchButton', menuState.goToMatchScreen, this, 2, 1, 0);
		var inventoryButton = game.add.button(width - 360, 28, 'inventoryButton', menuState.goToInventoryScreen, this, 2, 1, 0);
		var rankButton = game.add.button(width - 432, 28, 'rankButton', menuState.goToRankScreen, this, 2, 1, 0);
		var characterButton = game.add.button(width - 504, 28, 'characterButton', menuState.goToCharacterScreen, this, 2, 1, 0);	
	},
	/**
	 *	@description Retrieves the user information from the mongodb database. The string { @see bootState#user }
	 *		is passed upon successful login or registration. Once the data is retrieved the { @see menuState#menuScreen } is created.
	 *	@memberof menuState
	 *	@function getUserData
	 *	@todo Create an extensive error handling function. This type of function will be used in every screen.
	 */
	getUserData: function(){
		data.Get('/retrieve?id='+bootState.user['username'], function(data){
				bootState.user = JSON.parse(data)[0];
				menuState.menuScreen();
			});
	},
	goFullScreen: function() {
		if (game.scale.isFullScreen) {
			game.scale.minWidth = bootState.width;
			game.scale.minHeight = bootState.height;
			game.scale.maxWidth = bootState.width;
			game.scale.maxHeight = bootState.height;
			game.scale.stopFullScreen();
		} else {
			game.scale.minWidth = window.innerWidth;
			game.scale.minHeight = window.innerHeight;
			game.scale.maxWidth = window.innerWidth;
			game.scale.maxHeight = window.innerHeight;
			game.scale.startFullScreen(false);
		}
	},
	goToSettingsScreen: function(){
		/**	@see settings.js */
		game.state.start('settings');
	},
	goToChatScreen: function(){
		/** @see chat.js*/
		if(!document.getElementById('chatFieldDiv')){
			game.state.start('chat',false);
		} else {
			cloth.remove('chatFieldDiv');
			game.state.start('menu');

		}
		
	},
	goToSkillScreen: function(){
		game.debug.text("Skill Screen Hit", 300,480);
	},
	goToInventoryScreen: function(){
		game.debug.text( "Invetory Screen Hit", 300, 480);
	},
	goToMatchScreen: function(){
		game.debug.text( "Match Screen Hit", 300, 480);
	},
	goToRankScreen: function(){
		game.debug.text( "Rank Screen Hit", 300, 480);

	},
	goToCharacterScreen: function(){
		game.debug.text("Character Screen Hit",300,480)
	},
	/**
	 *	@description This function removes all the html elements.
	 *	@memberof menuState
	 *	@function removeAll
	 *	@todo Expand this function.
	 */
	removeAll: function(){
		cloth.remove('chatFieldDiv');
	},
}