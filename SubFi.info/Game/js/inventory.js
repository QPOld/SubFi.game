var inventoryState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof inventoryState
	 *	@function create
	 */
	create: function(){
		inventoryState.inventorySheet();
	},
	/***/
	inventorySheet: function(){
		var characterBackgroundScreen = game.add.sprite(550,232,'inventoryBackgroundScreen');
		var exitButton = game.add.button(1220, 237, 'exitButton',inventoryState.goToMainScreen , this, 2, 1, 0);
	},
	/***/
	goToMainScreen: function(){
		bootState.states.inventory = false;
		game.state.start('menu');
		// menuState.recreateStates(bootState.states)
	},
};