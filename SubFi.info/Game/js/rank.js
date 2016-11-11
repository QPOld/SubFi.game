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
		var characterBackgroundScreen = game.add.sprite(300,20,'rankBackgroundScreen');
		var exitButton = game.add.button(608, 25, 'exitButton',rankState.goToMainScreen , this, 2, 1, 0);
	},
	/***/
	goToMainScreen: function(){
		bootState.states.rank = false;
		// game.add.tween('rankBackgroundScreen').to( {x: -2000}, bootState.speed,  "Linear", true)
		game.state.start('menu');
	},
}