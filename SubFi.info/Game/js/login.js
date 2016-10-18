/* 
	loginState
	
	The entire login state is created in this file. This includes buttons, input fields, background images, etc..
	Helper functions used on this pages that are not get and post functions are contained in the file.
	Get and Post are from the data.js file. Data.js is an IIFE that only has a Get and Post function.
	
	Notes:
		CSS style for phaser-input inputFields may need to be in their own CSS file.
 */
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
		                width: 258,
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
		                width: 258,
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
					game.debug.text('Invalid Username/Password.',300,480);
				}
			});
		}
	},
};