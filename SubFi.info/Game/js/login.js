var loginState = {
	
	create: function(){
		
		loginState.loginForm();
		console.log('loginState Complete.');
	},
	loginForm: function(){
		var tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
		tabKey.onDown.add(loginState.switchFocus, this);
		var loginBackgroundScreen = game.add.tileSprite(0, 0, loadState.width, loadState.height, 'loginBackgroundScreen');
		user = game.add.inputField(loadState.width / 2+150, loadState.height/2, {
		                font: '18px Arial',
		                fill: '#212121',
		                fillAlpha: 1,
		                fontWeight: 'bold',
		                width: 158,
						height: 25,
		                max: 24,
		                padding: 8,
		                borderWidth: 1,
		                borderColor: '#000',
		                borderRadius: 1,
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
		                width: 158,
						height: 25,
		                padding: 8,
		                borderWidth: 1,
		                borderColor: '#000',
		                borderRadius: 1,
		                placeHolder: 'Password',
						textAlign: 'center',
		                type: Fabrique.InputType.password,
		                zoom: true
		            });
					password.blockInput = false;
		var submitButton = game.add.button(loadState.width/2+150, loadState.height/2 + 175, 'submitButton', loginState.goToMenuScreen, this, 2, 1, 0);
		var registerButton = game.add.button(loadState.width/2+250, loadState.height/2 + 175, 'registerButton', loginState.goToRegisterScreen, this, 2, 1, 0);
	},
	goToMenuScreen: function(){
		loginState.catchError();
	},
	goToRegisterScreen: function(){
		game.state.start('register');
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
	},
	catchError: function(){
		if(user.value == ''){
			user.endFocus();
			password.endFocus();
			user.startFocus();
		} else if(password.value == ''){
			user.endFocus();
			password.endFocus();
			password.startFocus();
		} else {
			data.Get('/login?id='+user.value+'&pass='+password.value, function(data){
				if(JSON.parse(data)['logged'] == 'true'){
					game.state.start('menu');
				} else {
					user.resetText();
					password.resetText();
				}
			});
		}
	},
};