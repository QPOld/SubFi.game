var settingsState = {
	create: function(){
		settingsState.settingsScreen();
	},
	settingsScreen: function(){
		settingsBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'settingsBackgroundScreen');
		var backButton = game.add.button( 15, 15, 'backButton',settingsState.goToMainScreen, this, 2 , 1, 0);
		var exitGameButton = game.add.button( 602, 200, 'exitGameButton',settingsState.goToLoginScreen, this, 2 , 1, 0);
	},
	goToMainScreen: function(){
		game.state.start('menu');
	},
	goToLoginScreen: function(){
		bootState.user = {};
		game.state.start('login');
	},
};