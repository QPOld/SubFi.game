/**
 *	@description The forgot username and password page.
 *
 *	@author Michael Parkinson <SubFiApp@gmail.com
 */
 
/**
 * @namespace forgotState
 */
var forgotState = {
	
	/**
	 *	@description Reserved name in Phaser.
	 *
	 *	@memberof forgotState
	 *
	 *	@function create
	 */
	create: function(){
		forgotState.forgotScreen();
	},
	
	/**
	 *	@description A screen for the user to retrieve the account information through a registered email.
	 *	
	 *	@see bootState#width
	 *	@see bootState#height
	 *	@see cloth#append
	 *
	 *	@memberof forgotState
	 *
	 *	@function forgotScreen
	 */
	forgotScreen: function(){
		
		var forgotBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'forgotBackgroundScreen');
		
		/**
		 *	@description Cloth is a simple html element generator.
		 *
		 *	@see cloth#append
		 */
		cloth.append(document.getElementsByTagName("canvas"), 'div', attrs={
			'id' : 'forgotFieldDiv'
		});
		cloth.append('forgotFieldDiv', 'input', attrs = {
			'id' : 'emailInputField',
			'type' : 'text',
			'placeholder' : 'Email',
			'class' : 'htmlInputFields'
		});
		
		// Phaser does not like html buttons.
		var backButton = game.add.button( 15, 15, 'backButton',forgotState.goToLoginScreen, this, 2 , 1, 0);
		var submitButton = game.add.button(755, 240, 'submitButton', forgotState.catchError, this, 2, 1, 0);
		var buttonGroup = game.add.group();
		buttonGroup.add(submitButton);
		buttonGroup.add(backButton);
		buttonGroup.alpha = 0;
		game.add.tween(buttonGroup).to( {alpha: 1}, bootState.speed,  "Linear", true)
		
	},
	
	/**
	 *	@description If the user did not mean to go to the registerState then the user canvas
	 *		a back button that will take the user to the login screen.
	 *
	 *	@see cloth#remove
	 *
	 *	@memberof forgotState
	 *
	 *	@function goToLoginScreen
	 *
	 */
	goToLoginScreen: function(){
		
		/** Removes the div for the email form. This can not be done in phaser.*/
		cloth.remove('forgotFieldDiv');
		
		/** @see login */
		game.state.start('login');
		
	},
	
	/**
	 *	@description This function makes a post call to do a query to find the 
	 *		account details associated with the given email. It will then email
	 *		the user the account information. This is a very sensitive function
	 *		since it emails the user and gives out username and password details.
	 *		If the email does not exist in the database then a warning is shown.
	 *
	 *	@see data#Post
	 *	@see cloth#retrieve
	 *	@see cloth#remove
	 *	@see cloth#value
	 *
	 *	@memberof forgotState
	 *
	 *	@function sendUserInfo
	 */
	sendUserInfo: function(){
		
		data.Post('/forgot','email='+cloth.retrieve('emailInputField'), function(data){
			
			if(JSON.parse(data)['forgot'] == 'true'){ // Email exists and email was sent.
			
				/** Removes the div for the email form. This can not be done in phaser.*/
				cloth.remove('forgotFieldDiv');
				
				/** @see login */
				game.state.start('login');
				
			} else if(JSON.parse(data)['forgot'] == 'false') { // Email does not exist and no email was sent.
			
				cloth.value('emailInputField','');
				registerState.displayErrorText(555, 180, "Email Did Not Send.");
				
			}
		})
		
	},
	
	/**
	 *	@description Catches errors for the email input field.
	 *
	 *	@see cloth#retrieve
	 *	@see cloth#focus
	 *
	 *	@memberof forgotState
	 *
	 *	@function catchError
	 */
	catchError: function(){
		
		if(cloth.retrieve('emailInputField') == ''){
			
			cloth.focus('emailInputField');
			
		} else {
			
			forgotState.sendUserInfo();
			
		}
	},
}; // End of forgotState.