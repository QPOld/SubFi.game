var registerState = {
	create: function(){
		
		registerState.registerForm();
		console.log('registerState Complete.');
	},
	registerForm: function(){
		var tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
		tabKey.onDown.add(loginState.switchFocus, this);
		var registerBackgroundScreen = game.add.tileSprite(0, 0, loadState.width, loadState.height, 'registerBackgroundScreen');
		email = game.add.inputField(loadState.width/2+150,loadState.height/2-100,{
					 font: '18px Arial',
		                fill: '#212121',
		                fillAlpha: 1,
		                fontWeight: 'bold',
		                width: 158,
						height: 25,
		                max: 54,
		                padding: 8,
		                borderWidth: 1,
		                borderColor: '#000',
		                borderRadius: 1,
		                placeHolder: 'Email',
		                textAlign: 'center',
		                zoom: true
				});
				email.blockInput = false;
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
		
		var submitButton = game.add.button(loadState.width/2+150, loadState.height/2 + 175, 'submitButton', registerState.goToMenuScreen, this, 2, 1, 0);
		var backButton = game.add.button( 15, 15, 'backButton',registerState.goToLoginScreen, this, 2 , 1, 0);
	},
	goToMenuScreen: function(){},
	goToLoginScreen: function(){
		game.state.start('login');
	},
}