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
		var tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
		tabKey.onDown.add(loginState.switchFocus, this);
		var loginBackgroundScreen = game.add.tileSprite(0, 0, bootState.width, bootState.height, 'loginBackgroundScreen');
		var user = game.add.inputField(bootState.width / 2+150, bootState.height/2, {
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
		var password = game.add.inputField(bootState.width/2+150, bootState.height/2 + 100, {
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