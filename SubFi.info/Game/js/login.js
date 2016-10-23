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
		cloth.append(document.getElementsByTagName("canvas"), 'div', attrs={
			'id' : 'loginFieldDiv'
		});
		cloth.append('loginFieldDiv', 'input', attrs = {
			'id' : 'usernameInputField',
			'type' : 'text',
			'placeholder' : 'Username',
		});
		cloth.append('loginFieldDiv', 'input', attrs = {
			'id' : 'passwordInputField',
			'type' : 'password',
			'placeholder' : 'Password',
		});
		// Phaser does not like html buttons.
		var submitButton = game.add.button(15, 150, 'submitButton', loginState.goToMenuScreen, this, 2, 1, 0);
		var registerButton = game.add.button(105, 150, 'registerButton', loginState.goToRegisterScreen, this, 2, 1, 0);
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
		loginState.removeAll();
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
			loginState.login();
		}
	},
	/**
	 *	@description Small login function. Makes a get request to the server to check the database if
	 *		the username and password make an entry. If the user does exist and the password is correct
	 *		then the global object { @see bootState#user} is updated with the users name.
	 *	@see data#Get
	 *	@see testserver.js
	 *	@memberof loginState
	 *	@function login
	 */
	login: function(){
		data.Get('/login?id='+cloth.retrieve('usernameInputField')+'&pass='+cloth.retrieve('passwordInputField'), function(data){
			if(JSON.parse(data)['logged'] == 'true'){
				bootState.user = {'username':cloth.retrieve('usernameInputField')};
				loginState.removeAll();
				/**	@see menu.js*/
				game.state.start('menu');
			} else {
				game.debug.text('Invalid Username/Password.',300,480);
			}
		});
	},
	/**
	 *	@description This function removes all the html elements.
	 *	@memberof loginState
	 *	@function removeAll
	 *	@todo Expand this function.
	 */
	removeAll: function(){
		cloth.remove('loginFieldDiv');
	},
};