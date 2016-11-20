var rankState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof rankState
	 *	@function create
	 */
	create: function(){
		rankState.rankSheet();
	},
	/***/
	rankSheet: function(){
		rankBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'rankBackgroundScreen');
		var exitButton = game.add.button( 1185, 20, 'exitGameButton',rankState.goToMainScreen, this, 2 , 1, 0);
	},
	/***/
	goToMainScreen: function(){		
		game.state.start('menu');
	},
}