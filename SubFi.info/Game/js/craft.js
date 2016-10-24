var craftState = {
	create: function(){
		craftState.craftScreen();
	},
	craftScreen: function(){
		craftBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'craftBackgroundScreen');
		backButton = game.add.button( 15, 15, 'backButton',craftState.goToMainScreen, this, 2 , 1, 0);
	},
	goToMainScreen: function(){
		game.state.start('menu');
	},
};