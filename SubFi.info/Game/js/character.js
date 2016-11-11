var characterState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof chatState
	 *	@function create
	 */
	create: function(){
		characterState.characterSheet();
	},
	/***/
	characterSheet: function(){
		var characterBackgroundScreen = game.add.sprite(0,225,'characterBackgroundScreen');
		var exitButton = game.add.button(470, 230, 'exitButton',characterState.goToMainScreen , this, 2, 1, 0);
	},
	/***/
	goToMainScreen: function(){
		bootState.states.character = false;
		// game.add.tween('characterBackgroundScreen').to( {x: -2000}, bootState.speed,  "Linear", true)
		game.state.start('menu');
	},
}