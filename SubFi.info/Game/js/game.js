/* 
	SubFi.game
	
	Within the index.html file there is a div with id gameDiv. This file attaches 
	a new Phaser.game object to that div. Each game screen is a unique game state.
	Each screen is determined by the js file attached to it.
	
	The game starts with boot.

	NOTES:
		Verison Control:
			Each commit should have its own version id. This will allow for eaiser debug.
			i.e.
				0.0.1a
			If an additional fix is needed on a commit use:
			i.e.
				0.0.1a-a
			Essentially sub versions for each commit to fix a previous fix.
		Resolution options:
			1920x1080
			1280x720
			1366:768
			The aspect ratio is approximately equal. ~1.77
		Game Art:
			All game art must be updated to the new resolution options.
			Create default game art. Similar to the counter strike sdk default material 
			assets. Too much time is being spent creating art for temporary purposes. 
			The real art will be out sourced for legitmacy and beauty.
		Server:
			For real the server has to change or at least proxypass to node.
			Scale the game off of node.
		Database:
			Exapnd upon MongoDb and Express interaction.
			Connect it with socket.io or it will have to be get/post functions.
	Issues:
		--> Create change resolution option in the settingsState
		--> Redo all art in new resolution mode.
		--> All art will become default game art.
		--> Buttons can not be tabbed through like basic html/css buttons.
		--> Develope CRUD for MongoDb.

 */
var game = new Phaser.Game(1280,720, Phaser.AUTO, 'gameDiv');

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('login',loginState);
game.state.add('register',registerState);
game.state.add('menu',menuState);
game.state.add('settings',settingsState);
game.state.add('chat',chatState);
game.state.add('skill',skillState);
game.state.add('character',characterState);
game.state.add('inventory',inventoryState);
game.state.add('match',matchState);

game.state.start('boot');