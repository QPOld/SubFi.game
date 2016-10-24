var skillState = {
	create: function(){
		skillState.skillScreen();
	},
	skillScreen: function(){
		skillBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'skillBackgroundScreen');
		backButton = game.add.button( 15, 15, 'backButton',skillState.goToMainScreen, this, 2 , 1, 0);
	},
	goToMainScreen: function(){
		game.state.start('menu');
	},
};