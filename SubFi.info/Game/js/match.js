var matchState = {
	create: function(){
		socket = io();
		matchState.matchScreen();
		if(bootState.user.pvpflag == 0){
			bootState.user.pvpflag = 1;
			socket.emit('find match', bootState.user.username);
		}
		
		
	},
	update: function(){
		if(bootState.user.pvpflag == 1){
			socket.on('find match', function(msg){
				
			});
		} else if(bootState.user.pvpflag == 2) {
			socket.on('in match',function(msg){
				
			});
		}
	},
	matchScreen: function(){
		matchBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'matchBackgroundScreen');
		backButton = game.add.button( 15, 15, 'backButton',matchState.goToMainScreen, this, 2 , 1, 0);
	},
	goToMainScreen: function(){
		game.state.start('menu');
	},
};