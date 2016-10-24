var tradeState = {
	create: function(){
		tradeState.tradeScreen();
	},
	tradeScreen: function(){
		tradeBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'tradeBackgroundScreen');
		backButton = game.add.button( 15, 15, 'backButton',tradeState.goToMainScreen, this, 2 , 1, 0);
	},
	goToMainScreen: function(){
		game.state.start('menu');
	},
};