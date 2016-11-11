/**
 *	@description The user login page. It contains two forms for a username and password.
 *		The user may select submit, to go to the register page, or retrieve a forgotten
 *		username/password. Upon a succesful login attempt the user object is updated 
 *		with the user info.
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
		
		loginState.loginForm();
		console.log('loginState Complete.'); // Remove upon release.
		
	},
	
	/**
	 *	@description Main function for the login form. This will hold each game element 
	 *		on the login form.
	 *
	 *	@see bootState#width
	 *	@see bootState#height
	 *	@see cloth#append
	 *
	 *	@memberof loginState
	 *
	 *	@function loginForm
	 *
	 */
	loginForm: function(){
		
		// I have no idea if there really needs a variable or not. In the examples and documentation it is used.
		var loginBackgroundScreen = game.add.tileSprite(0, 0, bootState.width, bootState.height, 'loginBackgroundScreen');
		
		/**
		 *	@description Cloth is a simple html element generator.
		 *
		 *	@see cloth#append
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
		var buttonGroup = game.add.group();
		buttonGroup.add(submitButton);
		buttonGroup.add(registerButton);
		buttonGroup.add(forgotButton);
		buttonGroup.add(exitProgramButton);
		buttonGroup.alpha = 0;
		game.add.tween(buttonGroup).to( {alpha: 1}, bootState.speed,  "Linear", true)

	}, // End of loginState.loginForm.
	
	/**
	 *	@description This function is called when the submit button is clicked.
	 *		It calls the error handler then proceeds to start the main screen if succesful.
	 *
	 *	@memberof loginState
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
	 *	@see cloth#remove
	 *
	 *	@memberof loginState
	 *
	 *	@function goToRegisterScreen
	 */
	goToRegisterScreen: function(){
		
		cloth.remove('loginFieldDiv');
		
		/**	@see register*/
		game.state.start('register', Phaser.Plugin.StateTransition.Out.FadeRight ,Phaser.Plugin.StateTransition.In.FadeLeft );
		
	}, // End of loginState.goToRegisterScreen.
	
	/**
	 *	@description The login error handler. It makes sure that each input field is
	 *		is filled with correct infomation. It calls the data.Get function
	 *
	 *	@see cloth#retrieve
	 *	@see cloth#focus
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
	 *		the username and password exist. If the user does exist and the password is correct
	 *		then the global object { @see bootState#user} is updated with the users name.
	 *
	 *	@see data#Get
	 *	@see cloth#retrieve
	 *	@see cloth#remove
	 *	@see cloth#value
	 *	@see bootState#user
	 *
	 *	@memberof loginState
	 *
	 *	@function login
	 */
	login: function(){
		
		data.Get('/login?id='+cloth.retrieve('usernameInputField')+'&pass='+cloth.retrieve('passwordInputField'), function(data){
			
			if(JSON.parse(data)['logged'] == 'true'){
				
				bootState.user = {'username':cloth.retrieve('usernameInputField')};
				
				/** Removes the div for the email form. This can not be done in phaser.*/
				cloth.remove('loginFieldDiv'); //  Possible make all html divs global plus a remove function.
				
				/**	@see menu*/
				game.state.start('menu',Phaser.Plugin.StateTransition.Out.ScaleUp ,Phaser.Plugin.StateTransition.In.ScaleUp);
				
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
	 *	@see cloth#remove
	 *
	 *	@memberof loginState
	 *
	 *	@function goToForgotScreen
	 */
	goToForgotScreen: function(){
		
		cloth.remove('loginFieldDiv');
		
		/** @see forgot*/
		game.state.start('forgot', Phaser.Plugin.StateTransition.Out.FadeTop ,Phaser.Plugin.StateTransition.In.FadeBottom);
		
	}, // End of loginState.goToForgotScreen.
	
	/**
	 *	@description Exits the program. This button will be implemented when 
	 *		electron is used to created desktop versions of the game.
	 *
	 *	@memberof loginState
	 *
	 *	@function goToExitScreen
	 *
	 *	@todo Look up electron api/docs about exiting a program.
	 */
	goToExitScreen: function(){
		
		game.debug.text("Exit Program Hit", 400,380);
		
	},// End of loginState.goToExitScreen.
};