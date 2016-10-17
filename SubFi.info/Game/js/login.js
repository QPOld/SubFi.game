var loginState = {
	
	create: function(){
		
		loginState.loginForm();
		console.log('loginState Complete.');
	},
	loginForm: function(){
		var tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
		tabKey.onDown.add(loginState.switchFocus, this);
		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.add(loginState.quickSubmit, this);
		loginBackgroundScreen = game.add.tileSprite(0, 0, loadState.width, loadState.height, 'loginBackgroundScreen');
		user = game.add.inputField(loadState.width / 2+150, loadState.height/2, {
		                font: '18px Arial',
		                fill: '#212121',
		                fillAlpha: 1,
		                fontWeight: 'bold',
		                width: 150,
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
		                width: 150,
		                padding: 8,
		                borderWidth: 1,
		                borderColor: '#000',
		                borderRadius: 1,
		                placeHolder: 'Password',
		                type: Fabrique.InputType.password,
		                zoom: true
		            });
					password.blockInput = false;
		submitButton = game.add.button(loadState.width/2+150, loadState.height/2 + 150, 'submitButton', loginState.goToMenuScreen, this, 2, 1, 0);
	},
	goToMenuScreen: function(){
		loginState.catchError();
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
	quickSubmit: function(){
		if(password.focus === true){
			loginState.catchError();
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