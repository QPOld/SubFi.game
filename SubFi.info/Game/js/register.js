/**
 *	@description The user register page.
 *	@author Michael Parkinson <SubFiApp@gmail.com
 */
/**
 * @namespace registerState
 */
var registerState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof registerState
	 *	@function create
	 */
	create: function(){
		registerState.registerForm();
		console.log('registerState Complete.'); // Remove upon final release.
	},
	/**
	 *	@description Main function for the register screen. Allows the user to input their 
	 *		email address, username, and password for the account.
	 *	@memberof registerState
	 *	@function registerForm
	 *
	 */
	registerForm: function(){
		var registerBackgroundScreen = game.add.tileSprite(0, 0, bootState.width, bootState.height, 'registerBackgroundScreen');
		/**
		 *	@description Cloth is a simple html element generator.
		 *	@see cloth.js
		 */
		cloth.append(document.getElementsByTagName("canvas"), 'div', attrs={
			'id' : 'registerFieldDiv'
		});
		cloth.append('registerFieldDiv', 'input', attrs = {
			'id' : 'emailInputField',
			'type' : 'text',
			'placeholder' : 'Email',
		});
		cloth.append('registerFieldDiv', 'input', attrs = {
			'id' : 'usernameInputField',
			'type' : 'text',
			'placeholder' : 'Username',
		});
		cloth.append('registerFieldDiv', 'input', attrs = {
			'id' : 'passwordInputField',
			'type' : 'password',
			'placeholder' : 'Password',
		});
		cloth.append('registerFieldDiv', 'input', attrs = {
			'id' : 'passwordInputFieldCopy',
			'type' : 'password',
			'placeholder' : 'Password Again',
		});
		var submitButton = game.add.button(15, 225, 'submitButton', registerState.goToMenuScreen, this, 2, 1, 0);
		var backButton = game.add.button(105, 225, 'backButton', registerState.goToLoginScreen, this, 2, 1, 0);
	},
	/**
	 *	@description When a user creates an account instead of just going back to 
	 *		the login page it will log you into the game.
	 *	@memberof registerState
	 *	@function goToMenuScreen
	 */
	goToMenuScreen: function(){
		registerState.catchError();
	},
	/**
	 *	@description In case a user hits the register button there is a back button. 
	 *		If a user does hit the browser back button then the game will be reloaded.
	 *	@memberof goToLoginScreen
	 *	@function goToLoginScreen
	 */
	goToLoginScreen: function(){
		registerState.removeAll();
		/**	@see login.js */
		game.state.start('login');
	},
	/**
	 *	@description The login error handler. It makes sure that each input field is
	 *		is filled with correct infomation. It calls the data.Get function
	 *	@see data.js
	 *	@see cloth.js
	 *	@memberof registerState
	 *	@function catchError
	 *	@todo Seperate the error handle from game.state.start call.
	 */
	catchError: function(){
		if(cloth.retrieve('emailInputField') == ''){
			cloth.focus('emailInputField');
		} else if(cloth.retrieve('usernameInputField') == ''){
			cloth.focus('usernameInputField');
		} else if(cloth.retrieve('passwordInputField') == ''){
			cloth.focus('passwordInputField');
		} else if(cloth.retrieve('passwordInputFieldCopy') == ''){
			cloth.focus('passwordInputFieldCopy');
		} else {
			registerState.removeAll();
			/**	@see menu.js*/
			game.state.start('menu');
			data.Get('/login?id='+cloth.retrieve('usernameInputField')+'&pass='+cloth.retrieve('passwordInputField'), function(data){
				if(JSON.parse(data)['logged'] == 'true'){
					registerState.removeAll();
					/**	@see menu.js*/
					game.state.start('menu');
				} else {
					game.debug.text('Invalid Username/Password.',300,480);
				}
			});
		}
	},
	/**
	 *	@description This function removes all the html elements.
	 *	@memberof registerState
	 *	@function removeAll
	 *	@todo Expand this function.
	 */
	removeAll: function(){
		cloth.remove('registerFieldDiv');
	},
}