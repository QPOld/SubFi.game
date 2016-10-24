var matchState = {
	create: function(){
		matchState.matchScreen();
	},
	matchScreen: function(){
		matchBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'matchBackgroundScreen');
		backButton = game.add.button( 15, 15, 'backButton',matchState.goToMainScreen, this, 2 , 1, 0);
	},
	goToMainScreen: function(){
		game.state.start('menu');
	},
};