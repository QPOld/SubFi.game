var loginState = {
	
	create: function(){
		
		loginState.loginForm();
		console.log('loginState Complete.');
	},
	loginForm: function(){
		var tabKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
		tabKey.onDown.add(loginState.switchFocus, this);
		loginBackgroundScreen = game.add.tileSprite(0, 0, loadState.width, loadState.height, 'loginBackgroundScreen');
		user = game.add.inputField(loadState.width / 2+150, loadState.height/2, {
		                font: '18px Arial',
		                fill: '#212121',
		                fillAlpha: 1,
		                fontWeight: 'bold',
		                width: 150,
		                max: 20,
		                padding: 8,
		                borderWidth: 1,
		                borderColor: '#000',
		                borderRadius: 6,
		                placeHolder: 'Username',
		                textAlign: 'center',
		                zoom: true
		            });
		            user.blockInput = false;
		password = game.add.inputField(loadState.width/2+150, loadState.height/2 + 100, {
		                font: '18px Arial',
		                fill: '#212121',
		                fillAlpha: 1,
		                fontWeight: 'bold',
		                width: 150,
		                padding: 8,
		                borderWidth: 1,
		                borderColor: '#000',
		                borderRadius: 6,
		                placeHolder: 'Password',
		                type: Fabrique.InputType.password,
		                zoom: true
		            });
					password.blockInput = false;
		submitButton = game.add.button(loadState.width/2+150, loadState.height/2 + 150, 'submitButton', loginState.goToMenuScreen, this, 2, 1, 0);
	},
	goToMenuScreen: function(){
		game.state.start('menu');
	},
	switchFocus: function(){
		if(user.focus === true && password.focus === false){
			user.endFocus();
			password.endFocus();
			password.startFocus();
		} else {
			user.endFocus();
			password.endFocus();
			user.startFocus();
		}
	}
};