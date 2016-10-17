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
			mainBackgroundScreen = game.add.tileSprite(0, 0, loadState.width, loadState.height, 'mainBackgroundScreen');
			fullScreenButton = game.add.button(loadState.width - 72, 28, 'fullScreenButton', menuState.goFullScreen, this, 2, 1, 0);
			settingsButton = game.add.button(loadState.width - 144, 28, 'settingsButton',menuState.goToSettingsScreen , this, 2, 1, 0);
			chatButton = game.add.button(loadState.width - 216, 28, 'chatButton', menuState.goToChatScreen, this, 2, 1, 0);
			skillButton = game.add.button(loadState.width - 288, 28, 'skillButton',menuState.goToSkillScreen, this, 2, 1, 0);
			matchButton = game.add.button(15, 15, 'matchButton', menuState.goToMatchScreen, this, 2, 1, 0);
			inventoryButton = game.add.button(loadState.width - 360, 28, 'inventoryButton', menuState.goToInventoryScreen, this, 2, 1, 0);
			rankButton = game.add.button(loadState.width - 432, 28, 'rankButton', menuState.goToRankScreen, this, 2, 1, 0);
			characterButton = game.add.button(loadState.width - 504, 28, 'characterButton', menuState.goToCharacterScreen, this, 2, 1, 0);
			
	},
	goFullScreen: function() {
			if (game.scale.isFullScreen) {
				game.scale.minWidth = loadState.width;
				game.scale.minHeight = loadState.height;
				game.scale.maxWidth = loadState.width;
				game.scale.maxHeight = loadState.height;
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