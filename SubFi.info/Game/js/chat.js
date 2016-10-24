/**
 *	@description A global chat for the entire game.
 */
 /**
  * @namespace chatState
  */
var chatState = {
	/**
	 *	@description Reserved name in Phaser.
	 *	@memberof chatState
	 *	@function create
	 */
	create: function(){
		/**
		 *	@description Create the chat window for the menuState.
		 *	@function chatState.chatWindow
		 */
		enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.add(chatState.sendMessage, this);
		socket = io();
		chatState.chatWindow();
		socket.emit('chat message', bootState.user['username'] +' connected.');
		cloth.focus('textInputField');
		console.log('chatState Complete.'); // Remove upon release.
	},
	update: function(){
		
		socket.on('chat message', function(msg){
			if(document.getElementById('chat_'+chatState.maxLI).innerHTML != msg){
				for(i=1;i<chatState.maxLI;i++){
					document.getElementById('chat_'+i).innerHTML = document.getElementById('chat_'+(i+1)).innerHTML;
				}
				document.getElementById('chat_'+chatState.maxLI).innerHTML = msg;
			}
			var objDiv = document.getElementById("globalChatField");
			objDiv.scrollTop = objDiv.scrollHeight;	
			
		}
			
		);
	},
	
	chatWindow: function(){
		cloth.append(document.getElementsByTagName("canvas"), 'div', attrs={
			'id' : 'chatFieldDiv'
		});
		cloth.append('chatFieldDiv','ul', attrs={
			'id':'globalChatField',
			'overflow':'scroll',
		});
		for(i=1;i<chatState.maxLI+1;i++){
			cloth.append('globalChatField','li',attrs={
				'id' : 'chat_'+i,
			});
		}
		
		cloth.append('chatFieldDiv', 'input', attrs = {
			'id' : 'textInputField',
			'type' : 'text',
			'placeholder' : 'Type Here',
		});
		
		var sendButton = game.add.button(455, 687, 'sendButton', chatState.sendMessage, this, 2, 1, 0);
	},
	sendMessage: function(){
		socket.emit('chat message', bootState.user['username'] +': '+cloth.retrieve('textInputField'));
		document.getElementById('textInputField').value = '';
		
	},
	maxLI:24,
};