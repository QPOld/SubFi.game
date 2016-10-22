/**
 *	@description The user login page.
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
/**
 * @namespace loginState
 */
var loginState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof loginState
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
	 *	@memberof loginState
	 *	@function loginForm
	 */
	loginForm: function(){
		var loginBackgroundScreen = game.add.tileSprite(0, 0, bootState.width, bootState.height, 'loginBackgroundScreen');
		/**
		 *	@description Cloth is a simple html element generator.
		 *	@see cloth.js
		 */
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
		cloth.append('inputFieldDiv', 'input', attrs={
			'id' : 'inputFieldSubmitButton',
			'type' : 'submit',
			'value' : 'Login',
			'onclick' : loginState.goToMenuScreen(),
		});
		cloth.append('inputFieldDiv', 'input', attrs={
			'id' : 'inputFieldRegisterButton',
			'type' : 'submit',
			'value' : 'Register',
			'onclick' : loginState.goToRegisterScreen(),
		});
	},
	/**
	 *	@description This function is called when the submit button is clicked.
	 *		It calls the error handler then proceeds to start the main screen if succesful.
	 *	@memberof loginState
	 *	@function goToMenuScreen
		@todo Seperate the error handle and the state switch.
	 */
	goToMenuScreen: function(){
		loginState.catchError();
	},
	/**
	 *	@description This function is called when the register button is clicked.
	 *	@memberof loginState
	 *	@function goToRegisterScreen
	 */
	goToRegisterScreen: function(){
		/**	@see register.js*/
		game.state.start('register');
	},
	/**
	 *	@description The login error handler. It makes sure that each input field is
	 *		is filled with correct infomation. It calls the data.Get function
	 *	@see data.js
	 *	@see cloth.js
	 *	@memberof loginState
	 *	@function catchError
	 *	@todo Seperate the error handle from game.state.start call.
	 */
	catchError: function(){
		if(cloth.retrieve('usernameInputField') == ''){
			cloth.focus('usernameInputField');
		} else if(cloth.retrieve('passwordInputField') == ''){
			cloth.focus('passwordInputField');
		} else {
			data.Get('/login?id='+cloth.retrieve('usernameInputField')+'&pass='+cloth.retrieve('passwordInputField'), function(data){
				if(JSON.parse(data)['logged'] == 'true'){
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
	 *	@memberof loginState
	 *	@function removeAll
	 *	@todo Expand this function.
	 */
	removeAll: function(){
		cloth.remove('inputFieldDiv');
	},
};