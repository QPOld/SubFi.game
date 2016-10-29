var forgotState = {
	create: function(){
		forgotState.forgotScreen();
	},
	forgotScreen: function(){
		forgotBackgroundScreen = game.add.tileSprite( 0, 0, bootState.width, bootState.height, 'forgotBackgroundScreen');
		/**
		 *	@description Cloth is a simple html element generator.
		 *
		 *	@see cloth.js
		 */
		cloth.append(document.getElementsByTagName("canvas"), 'div', attrs={
			'id' : 'loginFieldDiv'
		});
		cloth.append('loginFieldDiv', 'input', attrs = {
			'id' : 'emailInputField',
			'type' : 'text',
			'placeholder' : 'Email',
		});
		var backButton = game.add.button( 15, 15, 'backButton',forgotState.goToLoginScreen, this, 2 , 1, 0);
		var submitButton = game.add.button(755, 240, 'submitButton', forgotState.catchError, this, 2, 1, 0);
	},
	goToLoginScreen: function(){
		cloth.remove('loginFieldDiv');
		game.state.start('login');
	},
	sendUserInfo: function(){
		data.Post('/forgot','email='+cloth.retrieve('emailInputField'), function(data){
			if(JSON.parse(data)['forgot'] == 'true'){
				cloth.remove('loginFieldDiv');
				game.state.start('login');
			} else if(JSON.parse(data)['forgot'] == 'false') {
				cloth.value('emailInputField','');
				registerState.displayErrorText(555, 180, "Email Did Not Send.");
			}
		})
	},
	catchError: function(){
		if(cloth.retrieve('emailInputField') == ''){
			cloth.focus('emailInputField')
		} else {
			forgotState.sendUserInfo();
		}
	},
};