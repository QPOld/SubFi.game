/* 
	SubFi.game
	
	Within the index.html file there is a div with id gameDiv. This file attaches 
	a new Phaser.game object to that div. Each game screen is a unique game state.
	Each screen is determined by the js file attached to it.
	
	The game starts with boot.

	NOTES:
		Resolution options:
			1920x1080
			1366:768
			The aspect ratio is approximately equal. ~1.77
			--> Create change resolution option in the settingsState
		Game Art:
			All game art must be updated to the new resolution options.
			Create default game art. Similar to the counter strike sdk default material 
			assets. Too much time is being spent creating art for temporary purposes. 
			The real art will be out sourced for legitmacy and beauty.
		Server:
			For real the server has to change or at least proxypass to node.
			Scale the game off of node.
		Database:
			The fastest database that can return at least 60 updates a second from a 
			single user. This may not happen but the goal is speed. Possible MongoDb.
		User Input:
			Phaser-Input plug is not loading correctly. The user input aspect may need
			to change or be dropped completely. This means there will be no chat and
			user login much be done on seperate html file. Also this may lead to
			conflicting php session data. This is dependent upon the use of MongoDB
			and phasing out of php. The goal is 100% js.
			--> Remove phaser-input as of right now.

 */
var game = new Phaser.Game(1920,1080, Phaser.AUTO, 'gameDiv');

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('login',loginState);
game.state.add('menu',menuState);
game.state.add('settings',settingsState);
game.state.add('chat',chatState);
game.state.add('skill',skillState);
game.state.add('inventory',inventoryState);
game.state.add('match',matchState);

game.state.start('boot');