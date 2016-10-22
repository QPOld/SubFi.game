/* 
	menuState
	
	The main menu screen. 
 */
var menuState = {
	create: function(){
		menuState.menuScreen();
		console.log('menuState Complete.');
	},
	menuScreen: function () {
			var mainBackgroundScreen = game.add.tileSprite(0, 0, bootState.width, bootState.height, 'mainBackgroundScreen');
			var fullScreenButton = game.add.button(bootState.width - 72, 28, 'fullScreenButton', menuState.goFullScreen, this, 2, 1, 0);
			var settingsButton = game.add.button(bootState.width - 144, 28, 'settingsButton',menuState.goToSettingsScreen , this, 2, 1, 0);
			var chatButton = game.add.button(bootState.width - 216, 28, 'chatButton', menuState.goToChatScreen, this, 2, 1, 0);
			var skillButton = game.add.button(bootState.width - 288, 28, 'skillButton',menuState.goToSkillScreen, this, 2, 1, 0);
			var matchButton = game.add.button(15, 15, 'matchButton', menuState.goToMatchScreen, this, 2, 1, 0);
			var inventoryButton = game.add.button(bootState.width - 360, 28, 'inventoryButton', menuState.goToInventoryScreen, this, 2, 1, 0);
			var rankButton = game.add.button(bootState.width - 432, 28, 'rankButton', menuState.goToRankScreen, this, 2, 1, 0);
			var characterButton = game.add.button(bootState.width - 504, 28, 'characterButton', menuState.goToCharacterScreen, this, 2, 1, 0);
			
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
		game.debug.text( "Chat Screen Hit", 300, 480);
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
}