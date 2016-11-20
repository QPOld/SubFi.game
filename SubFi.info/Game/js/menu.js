/**
 *	@description The main menu for the entire game. The user will interact with this state to reach every aspect of the game.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
 
 /**
  *	@namespace menuState
  */
var menuState = {
	inventoryGroup:(function(){ var inventoryGroup; return inventoryGroup;})(),
	characterGroup:(function(){ var characterGroup; return characterGroup;})(),
	/** 
	 *	@description Reserved name in Phaser.
	 *
	 *	@memberof menuState
	 *
	 *	@function create
	 */
	create: function(){
		menuState.getUserData();
		
		console.log('menuState Complete.'); //Remove upon release.
		
	},
	
	/**
	 *	@description menuScreen contains all of the buttons and tileSprites. The function is called in a succesful callback
	 *		from the { @see menuState#getUserData} function.
	 *
	 *	@see bootState#width
	 *	@see bootState#height
	 *
	 *	@memberof menuState
	 *
	 *	@function menuScreen
	 */
	menuScreen: function () {
		menuState.inventoryGroup = game.add.group();
		menuState.characterGroup = game.add.group();
		var width = bootState.width;
		var height = bootState.height;
		var mainBackgroundScreen = game.add.tileSprite(0, 0, width, height, 'mainBackgroundScreen');
		var settingsButton = game.add.button(width - 72, 28, 'settingsButton',menuState.goToSettingsScreen , this, 2, 1, 0);
		var chatButton = game.add.button(width - 432, 28, 'chatButton', menuState.goToChatScreen, this, 2, 1, 0);
		var skillButton = game.add.button(width - 144, 28, 'skillButton',menuState.goToSkillScreen, this, 2, 1, 0);
		var tradeButton = game.add.button(width - 216, 28, 'tradeButton', menuState.goToTradeScreen, this, 2, 1, 0);
		var craftButton = game.add.button(width - 288, 28, 'craftButton', menuState.goToCraftScreen, this, 2, 1, 0);
		var rankButton = game.add.button(width - 360, 28, 'rankButton', menuState.goToRankScreen, this, 2, 1, 0);
		var matchButton = game.add.button(15, 15, 'matchButton', menuState.goToMatchScreen, this, 2, 1, 0);
		
		var inventoryBackgroundScreen = game.add.sprite(550,232,'inventoryBackgroundScreen');
		
		var characterBackgroundScreen = game.add.sprite(0,225,'characterBackgroundScreen');
		
		console.log(bootState.user)
		var style = { font: "32px Arial", fill: "#000000" };

		var text = game.add.text(230, 15, 'Welcome back ' + bootState.user.username + '!', style);
	},
	
	/**
	 *	@description Retrieves the user information from the mongodb database. The string { @see bootState#user }
	 *		is passed upon successful login or registration. Once the data is retrieved the { @see menuState#menuScreen } is created.
	 *
	 *	@memberof menuState
	 *
	 *	@function getUserData
	 *
	 *	@todo Create an extensive error handling function. This type of function will be used in every screen.
	 */
	getUserData: function(){
		data.Get('/retrieve?id='+bootState.user.username, function(data){
				bootState.user = JSON.parse(data)[0];
				menuState.menuScreen();
			});
	},
	
	/**
	 *
	 */
	goToSettingsScreen: function(){
		cloth.remove('chatFieldDiv');
		/**	@see settings.js */
		game.state.start('settings');
	},
	
	/**
	 *
	 */
	goToChatScreen: function(){
		/** @see chat.js*/
		if(!document.getElementById('chatFieldDiv')){
			game.state.start('chat', '', '', false,false);
		} else {
			cloth.remove('chatFieldDiv');
			game.state.start('menu');
		}
	},
	
	/**
	 *
	 */
	goToSkillScreen: function(){
		cloth.remove('chatFieldDiv');
		game.state.start('skill');
	},
	
	/**
	 *
	 */
	goToMatchScreen: function(){
		cloth.remove('chatFieldDiv');
		game.state.start('match');
	},
	
	/**
	 *
	 */
	goToRankScreen: function(){
		cloth.remove('chatFieldDiv');
		game.state.start('rank');
	},
	
	/**
	 *
	 */
	goToTradeScreen: function(){
		cloth.remove('chatFieldDiv');
		game.state.start('trade');
	},
	
	/**
	 *
	 */
	goToCraftScreen: function(){
		cloth.remove('chatFieldDiv');
		game.state.start('craft');
	},
}