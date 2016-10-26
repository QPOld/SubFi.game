/**
 *	@description The user register page.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com
 */
 
/**
 * @namespace registerState
 */
var registerState = {
	
	/**
	 *	@description Reserved name in Phaser.
	 *
	 *	@memberof registerState
	 *
	 *	@function create
	 */
	create: function(){
		registerState.registerForm();
		console.log('registerState Complete.'); // Remove upon final release.
	},
	
	/**
	 *	@description Main function for the register screen. Allows the user to input their 
	 *		email address, username, and password for the account.
	 *
	 *	@memberof registerState
	 *
	 *	@function registerForm
	 *
	 */
	registerForm: function(){
		var registerBackgroundScreen = game.add.tileSprite(0, 0, bootState.width, bootState.height, 'registerBackgroundScreen');
		
		/**
		 *	@description Cloth is a simple html element generator.
		 *
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
		// Phaser does not like html buttons.
		var submitButton = game.add.button(603, 417, 'submitButton', registerState.goToMenuScreen, this, 2, 1, 0);
		var backButton = game.add.button( 15, 15, 'backButton', registerState.goToLoginScreen, this, 2, 1, 0);
	},
	
	/**
	 *	@description When a user creates an account instead of just going back to 
	 *		the login page it will log you into the game.
	 *
	 *	@memberof registerState
	 *
	 *	@function goToMenuScreen
	 */
	goToMenuScreen: function(){
		registerState.catchError();
	},
	
	/**
	 *	@description In case a user hits the register button there is a back button. 
	 *		If a user does hit the browser back button then the game will be reloaded.
	 *
	 *	@memberof goToLoginScreen
	 *
	 *	@function goToLoginScreen
	 */
	goToLoginScreen: function(){
		cloth.remove('registerFieldDiv');
		/**	@see login.js */
		game.state.start('login');
	},
	
	/**
	 *	@description The login error handler. It makes sure that each input field is
	 *		is filled with correct infomation. It calls the data.Get function
	 *
	 *	@see data.js
	 *	@see cloth.js
	 *
	 *	@memberof registerState
	 *
	 *	@function catchError
	 *
	 *	@todo Add in additional password requirements. Things that are typical these days.
	 */
	catchError: function(){
		var email = cloth.retrieve('emailInputField');
		var username = cloth.retrieve('usernameInputField');
		var password = cloth.retrieve('passwordInputField');
		var passwordCopy = cloth.retrieve('passwordInputFieldCopy');
		var text;
		if(email == ''){
			registerState.displayErrorText(752, 218, "Email Is Missing.")
			cloth.focus('emailInputField');
		} else if(username == ''){
			registerState.displayErrorText(752, 276, "Username Is Missing.")
			cloth.focus('usernameInputField');
		} else if(password == ''){
			registerState.displayErrorText(752, 334, "Password Is Missing.")
			cloth.focus('passwordInputField');
		} else if(passwordCopy == ''){
			registerState.displayErrorText(752, 377, "Password Copy Is Missing.")
			cloth.focus('passwordInputFieldCopy');
		} else if(password != passwordCopy) {
			registerState.displayErrorText(752, 355, "Passwords do not match.")
			cloth.focus('passwordInputField');
		} else {
			registerState.register();
		}
	},
	
	/**
	 *	@description Displays error text. It will try to destroy any previous error text
	 *		before creating new error text. The x and y parameters are similar to 
	 *		cartesian coordinates starting from the top left hand corner.
	 *
	 *	@memberof registerState
	 *
	 *	@function displayErrorText
	 *
	 *	@param {number} x The x position of the text.
	 *	@param {number} y The y position of the text.
	 *	@param {string} text The text for the error message.
	 */
	displayErrorText: function(x,y,errorText){
		try {text.destroy()} catch(err) {}
			text = game.add.text(x, y, errorText,{ font: "17px Arial", fill: "#ff0044"});
	},
	
	/**
	 *	@description This function makes a Post to the server. It creates an entry in the data base and generates a new character sheet.
	 *
	 *	@see testserver.js
	 *	@see data#Post
	 *	@see bootState#user
	 *
	 *	@memberof registerState
	 *
	 *	@function register
	 */
	register: function(){
		data.Post('/register','id='+cloth.retrieve('usernameInputField')+'&pass='+cloth.retrieve('passwordInputField')+'&email='+cloth.retrieve('emailInputField'), function(data){
			if(JSON.parse(data)['registered'] == 'true'){
				bootState.user = {'username':cloth.retrieve('usernameInputField')};
				cloth.remove('registerFieldDiv');
				/**	@see menu.js*/
				game.state.start('menu');
			} else if(JSON.parse(data)['registered'] == 'Error'){
				registerState.displayErrorText(735, 260, "Connection Error.")
			} else {
				cloth.value('emailInputField','');
				cloth.value('usernameInputField','');
				cloth.value('passwordInputField','');
				cloth.value('passwordInputFieldCopy','');
				registerState.displayErrorText(735, 260, "Email or Username Is In Use.")
			}
		});
	},

}// End of registerState.