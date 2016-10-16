var loginState = {
	
	create: function(){
		loginState.loginForm();
		// game.state.start('menu');
		console.log('loginState Complete.');
	},
	loginForm: function(){
		var loginBackgroundScreen = game.add.tileSprite(0, 0, loadState.width, loadState.height, 'loginBackgroundScreen');
		var user = game.add.inputField(loadState.width / 2, loadState.height/2, {
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
		var password = game.add.inputField(loadState.width/2, loadState.height/2 + 100, {
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
		            password.focusOutOnEnter = false;
	},
};