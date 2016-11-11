/**
 *	@description The main menu for the entire game. The user will interact with this state to reach every aspect of the game.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
 
 /**
  *	@namespace menuState
  */
var menuState = {
	inventoryGroup:'',
	characterGroup:'',
	/**
	 *	@description Reserved name in Phaser.
	 *
	 *	@memberof menuState
	 *
	 *	@function create
	 */
	create: function(){
		menuState.getUserData();
		menuState.menuScreen();
		// menuState.recreateStates(bootState.states);
		
		
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
		var chatButton = game.add.button(width - 360, 28, 'chatButton', menuState.goToChatScreen, this, 2, 1, 0);
		var skillButton = game.add.button(width - 144, 28, 'skillButton',menuState.goToSkillScreen, this, 2, 1, 0);
		var inventoryButton = game.add.button(width - 504, 28, 'inventoryButton', menuState.moveIn, this, 2, 1, 0);
		var characterButton = game.add.button(width - 576, 28, 'characterButton', menuState.moveIn, this, 2, 1, 0);
		var tradeButton = game.add.button(width - 216, 28, 'tradeButton', menuState.goToTradeScreen, this, 2, 1, 0);
		var craftButton = game.add.button(width - 288, 28, 'craftButton', menuState.goToCraftScreen, this, 2, 1, 0);
		var rankButton = game.add.button(width - 432, 28, 'rankButton', menuState.goToRankScreen, this, 2, 1, 0);
		var matchButton = game.add.button(15, 15, 'matchButton', menuState.goToMatchScreen, this, 2, 1, 0);
		
		
		var inventoryBackgroundScreen = game.add.sprite(550,232,'inventoryBackgroundScreen');
		var inventoryExitButton = game.add.button(1220, 237, 'exitButton',menuState.moveOut , this, 2, 1, 0);
		
		menuState.inventoryGroup.add(inventoryBackgroundScreen);
		menuState.inventoryGroup.add(inventoryExitButton);
		menuState.inventoryGroup.alpha = 0
		
		
		var characterBackgroundScreen = game.add.sprite(0,225,'characterBackgroundScreen');
		var characterExitButton = game.add.button(470, 230, 'exitButton',menuState.moveOut , this, 2, 1, 0);
		
		menuState.characterGroup.add(characterBackgroundScreen);
		menuState.characterGroup.add(characterExitButton);
		menuState.characterGroup.alpha = 0
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
		data.Get('/retrieve?id='+bootState.user['username'], function(data){
				bootState.user = JSON.parse(data)[0];
				// menuState.menuScreen();
			});
	},
	
	/**
	 *
	 */
		console.log('Out')
	moveOut: function(){
		// game.add.tween(groupName).to( {alpha: 0}, bootState.speed,  "Linear", true)
	},
	/**
	 *
	 */
	moveIn: function(){
		console.log('In')
		// game.add.tween(groupName).to( {alpha: 1}, bootState.speed,  "Linear", true)
	},
	
	/**
	 *
	 */
	recreateStates:function(states){
		cloth.remove('chatFieldDiv');
		for (var key in states) {
			if(states[key] === true){
				console.log(key,states[key])
				// game.add.tween(key+'BackgroundScreen').to( {x: 2000}, bootState.speed,  "Linear", true)
				game.state.start(key, Phaser.Plugin.StateTransition.Out.FadeBottom, Phaser.Plugin.StateTransition.In.FadeTop, false, false)
				
				
			}
		}
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
			bootState.states.chat = true;
			game.state.start('chat', '', '', false,false);
		} else {
			bootState.states.chat = false;
			game.state.start('menu');
			// menuState.recreateStates(bootState.states)
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
	goToInventoryScreen: function(){
		bootState.states.inventory = true;
		game.state.start('inventory',Phaser.Plugin.StateTransition.Out.FadeBottom, Phaser.Plugin.StateTransition.In.FadeTop,false,false);
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
		bootState.states.rank = true;
		game.state.start('rank',Phaser.Plugin.StateTransition.Out.FadeTop, Phaser.Plugin.StateTransition.In.FadeBottom,false,false);
	},
	
	/**
	 *
	 */
	goToCharacterScreen: function(){
		bootState.states.character = true;
		game.state.start('character',Phaser.Plugin.StateTransition.Out.FadeRight, Phaser.Plugin.StateTransition.In.FadeLeft,false,false);
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