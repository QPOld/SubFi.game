/**
 *	@description The user login page. It contains two forms for a username and password.
 *		The user may select submit, to go to the register page, or retrieve a forgotten
 *		username/password. Upon a succesful login attempt the user object { @see boot.js}
 *		is updated with the user info.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com>
 */
 
/**
 * @namespace loginState
 */
var loginState = {
	
	/**
	 *	@description Reserved name in Phaser.
	 *
	 *	@memberof loginState
	 *
	 *	@function create
	 */
	create: function(){
		
		/**
		 *	@description Create the login form for the login state.
		 *
		 *	@function loginState.loginForm
		 */
		loginState.loginForm();
		console.log('loginState Complete.'); // Remove upon release.
	},
	
	/**
	 *	@description Main function for the login form. This will hold each game element 
	 *		on the login form.
	 *
	 *	@memberof loginState
	 *
	 *	@function loginForm
	 *
	 *	@todo Create an exit button for closing app to the desktop. Future need with electron.
	 */
	loginForm: function(){
		
		// I have no idea if there really needs a variable or not. In the examples and documentation it is used.
		var loginBackgroundScreen = game.add.tileSprite(0, 0, bootState.width, bootState.height, 'loginBackgroundScreen');
		
		/**
		 *	@description Cloth is a simple html element generator.
		 *
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
		var submitButton = game.add.button(555, 360, 'submitButton', loginState.goToMenuScreen, this, 2, 1, 0);
		var registerButton = game.add.button(651, 360, 'registerButton', loginState.goToRegisterScreen, this, 2, 1, 0);
		var forgotButton = game.add.button(555, 417, 'forgotButton', loginState.goToForgotScreen, this, 2, 1, 0);
		var exitProgramButton = game.add.button(1245,10,'exitProgramButton',loginState.goToExitScreen, this, 2, 1, 0);

	}, // End of loginState.loginForm.
	
	/**
	 *	@description This function is called when the submit button is clicked.
	 *		It calls the error handler then proceeds to start the main screen if succesful.
	 *
	 *	@memberof loginState
	 *
	 *	@see loginState#catchError
	 *	@see cloth#retrieve
	 *	@see cloth#focus
	 *	@see loginState
	 *
	 *	@function goToMenuScreen
	 *
	 */
	goToMenuScreen: function(){
		loginState.catchError();
	}, // End of loginState.goToMenuScreen.
	
	/**
	 *	@description This function is called when the register button is clicked.
	 *
	 *	@memberof loginState
	 *
	 *	@function goToRegisterScreen
	 */
	goToRegisterScreen: function(){
		cloth.remove('loginFieldDiv');
		/**	@see register.js*/
		game.state.start('register');
	}, // End of loginState.goToRegisterScreen.
	
	/**
	 *	@description The login error handler. It makes sure that each input field is
	 *		is filled with correct infomation. It calls the data.Get function
	 *
	 *	@see data.js
	 *	@see cloth.js
	 *
	 *	@memberof loginState
	 *
	 *	@function catchError
	 */
	catchError: function(){
		var username = cloth.retrieve('usernameInputField');
		var password = cloth.retrieve('passwordInputField');
		if(username == '') {
			cloth.focus('usernameInputField');
		} else if(password == '') {
			cloth.focus('passwordInputField');
		} else {
			loginState.login();
		}
	}, // End of loginState.catchError.
	
	/**
	 *	@description Small login function. Makes a get request to the server to check the database if
	 *		the username and password make an entry. If the user does exist and the password is correct
	 *		then the global object { @see bootState#user} is updated with the users name.
	 *
	 *	@see data#Get
	 *	@see testserver.js
	 *
	 *	@memberof loginState
	 *
	 *	@function login
	 */
	login: function(){
		data.Get('/login?id='+cloth.retrieve('usernameInputField')+'&pass='+cloth.retrieve('passwordInputField'), function(data){
			if(JSON.parse(data)['logged'] == 'true'){
				bootState.user = {'username':cloth.retrieve('usernameInputField')};
				cloth.remove('loginFieldDiv');
				/**	@see menu.js*/
				game.state.start('menu');
			} else {
				cloth.value('usernameInputField','');
				cloth.value('passwordInputField','');
				var text = game.add.text(735, 260, "Invalid Username or Password.",{ font: "17px Arial", fill: "#ff0044"});
			}
		});
	}, // End of loginState.login.
	
	/**
	 *	@description Allows the user to retrieve their username or password via email.
	 *
	 *	@memberof loginState
	 *
	 *	@function goToForgotScreen
	 */
	goToForgotScreen: function(){
		//npm install sendmail or nodemailer. Something simple to use.
		cloth.remove('loginFieldDiv');
		game.state.start('forgot');
	}, // End of loginState.goToForgotScreen.
	
	/**
	 *	@description Exits the program. This button will be implemented when 
	 *		electron is used to created desktop versions of the game.
	 *
	 *	@memberof loginState
	 *
	 *	@function goToExitScreen
	 *
	 */
	goToExitScreen: function(){
		game.debug.text("Exit Program Hit", 400,380);
	},// End of loginState.goToExitScreen.
};