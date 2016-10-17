var settingsState = {
	create: function(){
		settingsState.settingsScreen();
	},
	settingsScreen: function(){
		settingsBackgroundScreen = game.add.tileSprite( 0, 0, loadState.width, loadState.height, 'settingsBackgroundScreen');
		backButton = game.add.button( 15, 15, 'backButton',settingsState.goToMainScreen, this, 2 , 1, 0);
	},
	goToMainScreen: function(){
		game.state.start('menu');
	},
};