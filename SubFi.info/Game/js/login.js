/**
 *	@description The entire login state is created in this file. This includes
 *		buttons, input fields, background images, etc. The helper functions used
 *		on this pages are in data.js.
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 *
 *	@todo Create standard html/css input for the login page instead of Phaser-input.
 */
/**
 * @namespace loginState
 */
var loginState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberOf loginState
	 *	@function create
	 */
	create: function(){
		/**
		 *	@description Create the login form for the login state.
		 *	@function loginState.loginForm
		 */
		loginState.loginForm();
		console.log('loginState Complete.'); // Remove upon release.
	},
	/**
	 *	@description Main function for the login form. This will hold each game element 
	 *		on the login form.
	 *	@memberOf loginState
	 *	@function loginForm
	 *
	 *	@todo Redo this function in pure html/css.
	 */
	loginForm: function(){
		var loginBackgroundScreen = game.add.tileSprite(0, 0, bootState.width, bootState.height, 'loginBackgroundScreen');
		cloth.append('gameDiv', 'div', attrs={
			'id' : 'inputFieldDiv'
		});
		cloth.append('inputFieldDiv', 'input', attrs = {
			'id' : 'usernameInputField',
			'type' : 'text',
			'placeholder' : 'Username',
		});
		cloth.append('inputFieldDiv', 'input', attrs = {
			'id' : 'passwordInputField',
			'type' : 'password',
			'placeholder' : 'Password',
		});
		var submitButton = game.add.button(bootState.width/2+150, bootState.height/2 + 175, 'submitButton', loginState.goToMenuScreen, this, 2, 1, 0);
		var registerButton = game.add.button(bootState.width/2+250, bootState.height/2 + 175, 'registerButton', loginState.goToRegisterScreen, this, 2, 1, 0);
	},
	/**
	 *	@description This function is called when the submit button is down clicked.
	 *		It calls the error handler then proceeds to start the main screen if succesful.
	 *	@memberOf loginState
	 *	@function goToMenuScreen
	 */
	//////// LEFT OFF HERE ////////
	goToMenuScreen: function(){
		loginState.catchError();
	},
	goToRegisterScreen: function(){
		game.state.start('register');
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