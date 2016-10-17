/*
NOTES:

version : "0.0.0.0.8"

Current database configuration.
characterInfo = 
[0  ,   1  ,  2  , 3 ,  4  , 5    ,  6  ,  7 ,  8  , 9  , 10 , 11 ,  12  ,  13  ,  14  , 15,   16  ,   17     ,  18  ]
[id , name ,level,exp,intel,dexter,stren,cons,focus, sp , ir , br , kills,deaths,leaves,pvp,matchid,orderID   ,findID]
["5", "ali", "1" ,"0", "5" , "5"  , "5" , "5", "5" , "0", "0", "0",  "0" ,  "0" ,  "0" ,"2","quinn","0.924782",  "0" ]
(NULL,'".$conUse','1','0',','5'   ,'5'  ,'5' ,'5'  ,'5  ,'0' ,'0' ,'0'   ,'0'   ,'0    ',0',    '0 ,  '0'     ,  '0  )"

All Button and div CSS will combine in the JS File. generateSubmitButton needs to be updated.
Functions using the old version will not work until fixed. Essentially add in additional 
parameter for the style string. Then CSS will be default tag names and animations. If its 
possible to change this in js then all of it will be in the js file.

Create a function that shows the number of players online. This may be an admin function for
player statistic tracking. I was thinking a quick rewrite of the findSimilarPlayers function.

The namespace game contains all the public functions. Find a way to put the private functions into a seperate 
private name space for easy reading and searching. This may just be for looks and no essential.

Possible rename functions in the private namespace. Group like functions and give them similar names.
Keep the function progression the same on the dev side of things. Just the names.

The accept button for a match confirmation
should go to a seperate confirmation screen
then the mysql database can be updated safely.

Add in a backup function for characters that
want to play a match but have connection issues.
That way games are not wasted upon leaving the site.

There must be a way to connect p1 & p2. When p1 finds an opponent, p2,
p1 gets p2 info and p2 gets p1 info. Maybe update p2 match id with p1 name and update
p1 match id with p2 name. To play a game p1 and p2 will be searching for match ids
that equal their own name. Since all names are unique this can work.

Create a function that verifies both participants are in a match together. Assume
three users are in the finding a match queue. If the third "finds" a game that does
not exist then how does the client and server know this.

Redo getCharacterInfo so that it is easier to switch between dev and live mode.
Or create a python script that will parse the new.js file and change dev to live.
Local variable called live determines what mode it is in. Probably should still redo it.

Create a random number generator that can be generalized into a probability distribution.
I was thinking like a beta distro or some log-normal distro. Also Math.random may not
be random enough for the game.

Create comprehensive error handling for GET and POST. Any call back must have
a function handling the possible errors generated.

Create an admin program that can handle database updates and queries quickly. It should
be a file in the ../private section. Maybe add in some exception code for certain user names.

Create Error handlers for the Match Screen. Probably a function that checks if 
your opponent is still in game or something. Instead of throwing itself into an
infinite loop it will just assume the player won the game because of leave.



Finding a match logic:

mainScreen
|
V
searchScreen
|
V
confirmScreen
|
V
Update DB
>pvp=2
>p1:matchID=p2:name
>p2:matchID=p1:name
>orderID = 0  || 1
|
V
matchScreen

Public Function Problems:

Game Logic:
All screen transitions must be public. Either new functions must be rewritten or
new security functions need to be created. Probably some combination of both.
The funciton generateSubmitButton causes a weird private namespace error, private
functions can't be onclicks.

Functional Expansion:

Search for "This function may be expanded upon" and expand those functions!

 */
!function () {
	/*	Global Variables */
	var game = {
		version : "0.0.0.0.8"
	},
	game_document = this.document;
	// AMD and Module Support
	// This may be removed. Its copied from d3.
	if (typeof define === "function" && define.amd) {
		this.game = game;
		define(game);
	} else if (typeof module === "object" && module.exports) {
		module.exports = game;
	} else {
		this.game = game;
	}

	/* Private Functions */

	// This function is entirely needed but could be useful in the future.
	// This function may be expanded upon in the future.
	game_document.oncontextmenu = function () {
		return false; // This prevents the user from interacting with the right-click menu.
	};

	// Random Number generator.
	// This function may be expanded upon in the future.
	function random() {
		return Math.random();
	};

	// Sets CSS attributes for a html element.
	// Loops through all the keys in attrs and uses element.setAttribute.
	// Invalid keys and attributes are ignored.
	// The attrs variable has the form
	//	{
	//		'id':'elementID',
	//		'type' : 'submit',
	//		'example' : 'value',
	//	}
	function setAttributes(element, attrs) {
		for (var key in attrs) {
			element.setAttribute(key, attrs[key]);
		}
	};

	// Standard xmlHttp get request.
	// Takes in a url and attempts to get information.
	// There are no error handlers yet.
	// This function may be expanded upon in the future.
	function getRequest(url, callback) {
		var xmlhttp;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
				callback(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	};

	// Standard xmlhttp post request.
	// Takes a url and performs a post request.
	// There are no error handlers yet.
	// The data is in the form
	// "Name=pvp&Value=1"
	// Name and Value are php session variables
	// pvp and 1 are mysql database column id's
	// This function may be expanded upon in the future.
	function postRequest(url, data, callback) {
		var xmlhttp;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
				callback(xmlhttp.responseText);
			}
		}
		xmlhttp.send(data);
	};

	// Helper function for the menuScreen and characterScreen.
	// Rank as of right now is determined by a linear combination
	// of the character's level, item rank, and battle rank.
	// This function may be expanded upon in the future.
	function calculateRank(characterInfo) {
		var level = parseFloat(characterInfo[2]), // The db stores variables as strings.
		ir = parseFloat(characterInfo[11]),
		br = parseFloat(characterInfo[10]),
		rank = level + ir + br;
		return rank;
	};

	// As of right now the the character level is determined by a power law.
	// This function may be expanded upon in the future.
	function calculateExp(charLevel) {
		var exp = 0;
		exp = Math.pow(5, charLevel); // This may become more complex.
		return exp;
	};

	// Creates a submit button on the parent element with the child's name.
	// The button displays the text value,
	// Onclick the button performs the Function.
	// The Function must be a public function represented in a string.
	// Private functions passed through strings in an IIFE do not work.
	function generateSubmitButton(parent, child, text, Function, style) {
		appendElementWithID(parent, 'input', attrs = {
				'id' : child + 'Button', // The menu addition may be dropped later.
				'type' : 'submit',
				'value' : text,
				'onclick' : Function, // Forced to be public.
				'style' : style,
				
			});
	};

	// Creates two spans that contain character info from the database.
	// The parent div will contain the span with the child's name.
	// This function may be expanded upon in the future.
	function generateSkillPointInfo(parent, child, text, characterInfo, index) {
		appendElementWithID(parent, 'div', attrs = {
				'id' : child + 'Info',
				'style' : '\
					display:inline-block;',
			});
		appendElementWithID(child + 'Info', 'span', attrs = {
				'id' : child + 'Name',
				'style' : '\
					float:left;'
			});
		updateTextWithID(child + 'Name', text);
		appendElementWithID(child + 'Info', 'span', attrs = {
				'id' : child + 'Val',
				'style' : '\
					float:right;'
			});
		updateTextWithID(child + 'Val', characterInfo[index]);
	};

	// When a character level's up a + sign will appear next to their skills.
	// This function generates those skill buttons.
	// This function may be expanded upon in the future.
	function generateSkillPointButton(child) {
		appendElementWithID(child + 'Info', 'input', attrs = {
				'id' : child + 'Button',
				'type' : 'button',
				'value' : '\u2713',
				'style' : '\
					font-size: 15px;\
					border-radius:14px;\
					float:right;',
			});
	};

	// Creates default character info.
	// It shows the character's name and rank on top of a dynamic experience bar.
	// This function may be expanded upon in the future.
	function generateCharacterInfo(parent, child, characterInfo) {
		appendElementWithID(parent, 'p', attrs = {
				'id' : child + 'info',
				'style' : '\
					margin-top:5px;\
					margin-bottom:5px;\
					width:100%;\
					height:10%;\
					font-size: 33px;\
					text-decoration: none;\
					text-align: center;\
					vertical-align: middle;',
			});
		updateTextWithID(child + 'info', characterInfo[1] + ' : Rank ' + calculateRank(characterInfo));
		appendElementWithID(parent, 'div', attrs = {
				'id' : 'expbar',
				'style' : '\
				background-color:#C5CEE8;\
				width:100%;\
				height:10%;',
			});
		appendElementWithID('expbar', 'div', attrs = {
				'id' : 'exp',
				'style' : '\
					width:' + 100 * characterInfo[3] / calculateExp(characterInfo[2]) + '%;\
					border-radius: 0px 50px 50px 0px;\
					background-color:#D8EDFF;\
					display: inline-block;\
					height:100%;\
					margin: 0 auto;\
					font-size: 33px;\
					text-decoration: none;\
					text-align: center;\
					vertical-align: middle;',
			});
		updateTextWithID('exp', 100 * characterInfo[3] / calculateExp(characterInfo[2]) + '%');
		appendElementWithID(parent, 'p', attrs = {
				'id' : 'additional' + child + 'info',
				'style' : '\
					padding-bottom:3px;\
					margin-top:5px;\
					margin-bottom:5px;\
					width:100%;\
					height:34px;\
					font-size: 33px;\
					text-decoration: none;\
					text-align: center;\
					vertical-align: middle;',
			});
	};

	// When finding an opponent, an animation will play.
	// Animations are located in the mainStyle.css file.
	// The animation may be dropped or simplified for proformance issues.
	function playSearchAnimation(parent) {
		appendElementWithID(parent, 'p', attrs = {
				'id' : 'searchingTextAnimation'
			});
		updateTextWithID('searchingTextAnimation', 'Searching For A Match...');
		appendElementWithID(parent, 'div', attrs = {
				'id' : 'floatBarsG',
				'class' : 'floatBarsG'
			});
		appendElementWithID('floatBarsG', 'div', attrs = {
				'id' : 'floatbar12',
				'class' : 'floatBarsG'
			});
		appendElementWithID('floatbar12', 'div', attrs = {
				'id' : 'floatBarsG_1',
				'class' : 'floatBarsG'
			});
		appendElementWithID('floatbar12', 'div', attrs = {
				'id' : 'floatBarsG_2',
				'class' : 'floatBarsG'
			});
		appendElementWithID('floatBarsG', 'div', attrs = {
				'id' : 'floatbar34',
				'class' : 'floatBarsG'
			});
		appendElementWithID('floatbar34', 'div', attrs = {
				'id' : 'floatBarsG_3',
				'class' : 'floatBarsG'
			});
		appendElementWithID('floatbar34', 'div', attrs = {
				'id' : 'floatBarsG_4',
				'class' : 'floatBarsG'
			});
	};

	// Every game screen is wrapped in a general screen div.
	// When a screen transition occurs all html elements must be removed.
	// This function removes every screen possible even if it doesn't exist.
	function removeAllScreens() {
		removeElementWithID('MenuScreen');
		removeElementWithID('SearchScreen');
		removeElementWithID('AcceptDenyButton');
		removeElementWithID('MatchScreen');
		removeElementWithID('ConfirmScreen');
		removeElementWithID('CharacterScreen');
		removeElementWithID('InventoryScreen');
		removeElementWithID('SettingsScreen');
		removeElementWithID('RankingsScreen');
		removeElementWithID('floatBarsG');
	};

	// This function takes in a parent div and generates a top 10 list.
	// The data comes from a get request that returns the data in an array.
	// The data is then looped and displayed on screen.
	function generateTopPlayerTable(parent, data) {
		appendElementWithID(parent, 'table', attrs = {
				'id' : 'tableRank',
			});
		appendElementWithID('tableRank', 'th', attrs = {
				'id' : 'numHead'
			});
		updateTextWithID('numHead', '#');
		appendElementWithID('tableRank', 'th', attrs = {
				'id' : 'nameHead'
			});
		updateTextWithID('nameHead', 'Name');
		appendElementWithID('tableRank', 'th', attrs = {
				'id' : 'rankHead'
			});
		updateTextWithID('rankHead', 'Rank');
		for (var i = 0; i < data.length; i++) {
			appendElementWithID('tableRank', 'tr', attrs = {
					'id' : 'Row' + i
				});
			appendElementWithID('Row' + i, 'td', attrs = {
					'id' : 'Col1' + i
				});
			updateTextWithID('Col1' + i, i + 1);
			appendElementWithID('Row' + i, 'td', attrs = {
					'id' : 'Col2' + i
				});
			updateTextWithID('Col2' + i, data[i]['name']);
			appendElementWithID('Row' + i, 'td', attrs = {
					'id' : 'Col3' + i
				});
			updateTextWithID('Col3' + i, parseFloat(data[i]['level']) + parseFloat(data[i]['ir']) + parseFloat(data[i]['br']));
		}
	};

	// Helper Function for generateTopPlayerTable.
	function findTopRank(parent) {
		getRequest('https://www.subfi.info/game/private/findTopPlayers.php',
			function (data) {
			generateTopPlayerTable(parent, JSON.parse(data));
		})
	};

	// If a user attempts to falsify the character info then
	// an action must be taken.
	// As of right now it redirects you to the index page.
	// This function may be expanded upon in the future.
	function verifyCharacterInfo(characterInfo) {
		if (!characterInfo) {
			window.location = "https://www.subfi.info";
		}
	};

	// If a user attemtps to falsify a display function.
	// Similar to verifyCharacterInfo.
	// This function may be expanded upon in the future.
	function verifyDisplayFunction(displayFunction) {
		if (!displayFunction) {
			window.location = "https://www.subfi.info";
		}
	};

	//Initialization function.
	// This function is called at the bottom of the file.
	// The entirity of the game is contained in the header.
	function start() {
		createCharacterInfo(); // Checks if characters exist if not create one.
		game.getCharacterInfo(game.menuScreen); // Main screen transition.
	};

	// The character name is determined with php session variables.
	// If the character does not exist then one will be made.
	// If the character does exist then nothing will happen.
	function createCharacterInfo() {
		getRequest('https://www.subfi.info/game/private/createCharacterInfo.php',
			function () {});
	};
	
	// Creates the CSS for elements with Tag (p, html, body, th, tr, etc..).
	// This will remove most of the required css from mainStyle.css.
	function ChangeCSSForTagName(tagName, attrs) {
		tagName = game_document.getElementsByTagName(tagName);
		if (tagName !== undefined || tagName !== null) {
			setAttributes(tagName, attrs);
		}
	};
	
	// Takes in the parent html element then adds in ElementID with attributes attrs.
	// If the parent does not exist then the elementID is attached to the body.
	// Again the attrs is of the form:
	//	{ 'id' : 'exampleID',}
	function appendElementWithID(parent, elementID, attrs) {
		parent = game_document.getElementById(parent);
		if (parent === undefined || parent === null) {
			parent = game_document.createElement(elementID);
			setAttributes(parent, attrs);
			game_document.body.appendChild(parent);
		} else {
			elementID = game_document.createElement(elementID);
			setAttributes(elementID, attrs);
			parent.appendChild(elementID);
		}
	};

	// An element created with appendElementWithID with attrs {'id' : 'elementID',}
	// can be removed with this function. If the element does not exist then
	// nothing happens. Through out the code all html/css input has an 'id' in the attrs.
	function removeElementWithID(elementID) {
		var elem = game_document.getElementById(elementID);
		if (elem != null) {
			elem.parentNode.removeChild(elem);
		}
	};

	// When creating spans and p with appendElementWithID you will need this
	// function to add in text. If the element does not exist then nothing happens.
	function updateTextWithID(elementID, val) {
		if (game_document.getElementById(elementID) != null) {
			game_document.getElementById(elementID).textContent = val;
		}
	};

	// Called when the user clicks the find match button on the main screen.
	// It does a post request to change the users pvp flag. This is on a callback
	// so the animation is going to wait to start until a db change.
	// Every 2 seconds the findOpponent functino is called with ID findID.
	function findSimilarPlayers() {
		updateSingleParam("Name=pvp&Value=1"); // Here is the post request. The input will change.
		playSearchAnimation('SearchScreen'); // SearchScreen at the moment is the only animation.
		var ID = setInterval(function () { // ID allows the code to stop.
				findOpponent(ID);
			}, 2000); // This can be increased if too many post requests are being made.
	};

	// This functions does a mysql call for users with pvp flags equaled to 1 (true) which
	// means that they are currently at that moment looking for an opponent. The mysql call
	// also has a filter for other users so a "perfect" match can be found.
	// As of right now is returns the characterInfo for the opponent.
	// Refer to the notes.
	// This function may be expanded upon in the future.
	function findOpponent(findID) {
		getRequest('https://www.subfi.info/game/private/locateOpponent.php',
			function (data) { // callback on the data
			var jsonData = JSON.parse(data); // This returns an array of possible users.
			if (jsonData.length !== 0) {
				removeAllScreens();
				clearInterval(findID);
				updateSingleParam("Name=matchid&Value='" + jsonData[0]['name'] + "'");
				opponentAcceptButton();
			}
		})
	};

	// Big Accept and Deny Buttons that clear the screen. One brings you deeper
	// into the rabbit hole and the other leads back to the beginning.
	// The css may change but more or less this functions works as intended.
	function opponentAcceptButton() {
		appendElementWithID('body', 'div', attrs = {
				'id' : 'AcceptDenyButton',
				'style' : '\
					text-align:center;\
					vertical-align: middle;',
			});
		appendElementWithID('AcceptDenyButton', 'p', attrs = {
				'id' : 'MatchFoundText'
			});
		updateTextWithID('MatchFoundText', 'A Match Has Been Found');
		appendElementWithID('AcceptDenyButton', 'input', attrs = {
				'id' : 'acceptButton',
				'type' : 'submit',
				'value' : 'Accept',
				'onclick' : 'game.confirmScreen()',
				'style' : '\
					padding:15px;\
					margin:15px;\
					background-color:#99CC9E;',
			});
		appendElementWithID('AcceptDenyButton', 'input', attrs = {
				'id' : 'denyButton',
				'type' : 'submit',
				'value' : 'Deny',
				'onclick' : 'game.getCharacterInfo(game.menuScreen)',
				'style' : '\
					padding:15px;\
					margin:15px;\
					background-color:#7F5362;',
			});
	};

	//
	function getOpponentInfo(characterInfo){
		postRequest('https://www.subfi.info/game/private/retrieveOpponentInfo.php', "Name="+characterInfo[16],
			function (data) {
				var opponentInfo = JSON.parse(data);
				console.log(opponentInfo[17],opponentInfo[17] === "-1")
				if (opponentInfo[17] === "-1") {
					getOpponentInfo(characterInfo);
				} else {
					nextMove(characterInfo,opponentInfo)
				}
			})
	};
	
	//
	function nextMove(characterInfo,opponentInfo){
		console.log( parseInt(characterInfo[17].split('.')[1]),parseInt(opponentInfo[17].split('.')[1]))
		if( parseInt(characterInfo[17].split('.')[1]) > parseInt(opponentInfo[17].split('.')[1]) ) {
			console.log('You Move First');
		} else {
			console.log("You Move Second");
		}
	};
	// As of right now the code allows for single post requests.
	// This function may be expanded upon in the future.
	function updateSingleParam(data) {
		postRequest('https://www.subfi.info/game/private/updateCharacterInfo.php', data,
			function () {})
	};

	// Resets the pvp flag to 0 and resets game info.
	function defaultCharacterState(characterInfo) {
		updateSingleParam("Name=pvp&Value=0"); // When a player is pvp=0 the game is at the menuScreen.
		updateSingleParam("Name=matchid&Value=''");// matchid is the opponent's name. A null string can not be a name.
		updateSingleParam("Name=orderID&Value=-1"); // The MySQL query calls for position games numbers. This isn't one.
		for (var i = 1; i < 99999; i++) {window.clearInterval(i);} // Bad fix but works. This has to change.
	};

	// This needs to be looked into.
	function characterLevelScreenAddition(characterInfo) {
		if (characterInfo[3] == 0) { // Check the exp for level up.
			generateSubmitButton('characterOptions', 'resetCharacterScreen', 'Reset', 'game.getCharacterInfo(game.characterScreen)','');
			generateSubmitButton('characterOptions', 'confirmCharacterScreen', 'Confirm', '','');
			appendElementWithID('PlayerStats', 'p', attrs = {
					'id' : 'SkillPoints'
				});
			updateTextWithID('SkillPoints', 'Skill Points : ' + characterInfo[9]);
			generateSkillPointButton('int');
			generateSkillPointButton('dex');
			generateSkillPointButton('str');
			generateSkillPointButton('con');
			generateSkillPointButton('foc');
		}
	};

	/* Public */

	// The key data transfer function for the entire game. This is the function that
	// commucates with the server to update the characterInfo array. The server is always
	// right and this is the messenger. As of right now there are two options, testing
	// and live.
	// This function may be expanded upon in the future.
	game.getCharacterInfo = function (displayFunction) {
		verifyDisplayFunction(displayFunction);
		var live = 1,
		testArray = [1, "quinn", 1, 2, 5, 5, 5, 5, 5, 5, 6, 3, 0, 0, 0, 0, 0,0,8]; // See notes.
		if (live) {
			getRequest('https://www.subfi.info/game/private/retrieveCharacterInfo.php',
				function (data) {
				var char_info = JSON.parse(data);
				displayFunction(char_info);
			});
		} else {
			displayFunction(testArray);
		}
	};

	/* Game Screens */
	// All Screens verify the characterInfo and remove all other screens.
	// As of right now only the main menu forces a 0 (false) pvp flag.
	// This may provide access in game to other screens without quitting
	// a match.

	// The main menu screen is the key hub for the entire game. The user will
	// always end up here. The logout button redirects the users to a logout php file.
	// The logout php file clears the php session variables that are used to access the db.
	game.menuScreen = function (characterInfo) {
		verifyCharacterInfo(characterInfo);
		defaultCharacterState(characterInfo)
		removeAllScreens();
		appendElementWithID('body', 'div', attrs = {
				'id' : 'MenuScreen',
				'style' : '\
					width:100%;\
					height:100%;',
			});
		appendElementWithID('MenuScreen', 'div', attrs = {
				'id' : 'menuInfo',
			});
		generateCharacterInfo('menuInfo', 'char', characterInfo);
		appendElementWithID('MenuScreen', 'div', attrs = {
				'id' : 'menuOptions',
				'style' : '\
					width:100%;\
					opacity:0.775;',
			});
		generateSubmitButton('menuOptions', 'find', 'Find Match', 'game.getCharacterInfo(game.searchScreen)',
			'\
				width:100%;\
				font-size:33px;\
				text-decoration:none;\
				margin-bottom:15px;\
				text-align:center;\
				vertical-align:middle;\
			');
		generateSubmitButton('menuOptions', 'char', 'Character', 'game.getCharacterInfo(game.characterScreen)',
			'\
				display:block;\
				font-size: 33px;\
				margin:0 auto;\
				width:100%;\
				height:100%;\
			');
		generateSubmitButton('menuOptions', 'invent', 'Inventory', 'game.getCharacterInfo(game.inventoryScreen)',
			'\
				font-size: 33px;\
				display:block;\
				margin:0 auto;\
				margin-top:15px;\
				margin-bottom:15px;\
				width:100%;\
				height:100%;\
			');
		generateSubmitButton('menuOptions', 'rank', 'Rankings', 'game.getCharacterInfo(game.rankingsScreen)',
			'\
				font-size: 33px;\
				display:block;\
				margin:0 auto;\
				margin-bottom:15px;\
				width:100%;\
				height:100%;\
			');
		generateSubmitButton('menuOptions', 'settings', 'Settings', 'game.getCharacterInfo(game.settingsScreen)',
			'\
				font-size: 33px;\
				display:block;\
				margin:0 auto;\
				width:100%;\
				height:100%;\
			');
		generateSubmitButton('menuOptions', 'logout', 'Logout', 'location.href="../private/logout.php"',
			'\
				font-size: 33px;\
				display:block;\
				margin:0 auto;\
				margin-top:15px;\
				width:100%;\
				height:100%;\
			');
	};

	// The search screen has an animation and a single button to leave the queue.
	// There may be an additional options for checking your character or inventory screens.
	// This function may be expanded upon in the future.
	game.searchScreen = function (characterInfo) {
		verifyCharacterInfo(characterInfo);
		removeAllScreens();
		appendElementWithID('body', 'div', attrs = {
				'id' : 'SearchScreen',
				'style' : '\
					width:100%;\
					height:100%;',
			});
		appendElementWithID('SearchScreen', 'div', attrs = {
				'id' : 'searchOptions',
			});
		generateSubmitButton('searchOptions', 'search', 'Leave Queue', 'game.getCharacterInfo(game.menuScreen)',
			'\
			');
		findSimilarPlayers();
	};

	//
	game.confirmScreen = function () {
		updateSingleParam("Name=pvp&Value=2");
		updateSingleParam("Name=orderID&Value=" + random());
		game.getCharacterInfo(game.matchScreen);
	};

	// This function may be expanded upon in the future.
	game.matchScreen = function (characterInfo) {
		verifyCharacterInfo(characterInfo);
		getOpponentInfo(characterInfo);
		removeAllScreens();
		console.log(characterInfo);
		appendElementWithID('body', 'div', attrs = {
				'id' : 'MatchScreen',
			});
		appendElementWithID('MatchScreen', 'div', attrs={
				'id' : 'gameInfo'
			});
		appendElementWithID('gameInfo', 'p', attrs={
				'id' : 'roundNumber',
			});
		updateTextWithID('roundNumber', 'Round ' + parseInt(characterInfo[17].split('.')[0]) );
		
		appendElementWithID('MatchScreen', 'div', attrs = {
				'id' : 'opponent',
			});
		appendElementWithID('opponent', 'p', attrs = {
				'id' : 'opponentName'
			});
		updateTextWithID('opponentName', 'opponent : ' + characterInfo[16]);
		
		appendElementWithID('MatchScreen', 'div', attrs={
				'id' : 'playerInfo'
			});
		appendElementWithID('playerInfo', 'p', attrs={
				'id' : 'playerHealth'
			});
		updateTextWithID('playerHealth', "Health : "+ 100*(parseFloat(characterInfo[18])/Math.pow(2,parseInt(characterInfo[7]))).toFixed(4) + "%" );
		
		console.log(parseFloat(characterInfo[18]), Math.pow(1.5,parseInt(characterInfo[7])))
		appendElementWithID('MatchScreen', 'div', attrs = {
				'id' : 'playerMoves',
			});
		
		appendElementWithID('playerMoves', 'div', attrs = {
				'id' : 'possibleAttacks',
			});
		generateSubmitButton('possibleAttacks', 'melee', 'Melee', '', '');
		generateSubmitButton('possibleAttacks', 'range', 'Range', '', '');
		generateSubmitButton('possibleAttacks', 'magic', 'Magic', '', '');
		generateSubmitButton('possibleAttacks', 'defense', 'Defense', '', '');
		
		appendElementWithID('playerMoves', 'div', attrs = {
				'id' : 'currentAttacks',
			});
		for (i=0;i<parseInt(characterInfo[17].split('.')[0])+1;i++){
			appendElementWithID('currentAttacks', 'div', attrs={
				'id' : 'skill_'+i,
				'style' : '\
					position:relative;\
					font-size:36px;\
					border-radius:14px;\
					width:25px;\
					height:25px;\
					background-color:gray;\
					margin:0px auto;'
			});
		 }
		
		appendElementWithID('MatchScreen', 'div', attrs={
			'id' : 'matchOptions'
		});
		generateSubmitButton('matchOptions','finish', 'Finish', 'game.getCharacterInfo(game.matchScreen)', '')
			
		generateSubmitButton('matchOptions', 'backToMain', 'Leave', 'game.getCharacterInfo(game.menuScreen)', '');
	};

	// This function may be expanded upon in the future.
	game.characterScreen = function (characterInfo) {
		verifyCharacterInfo(characterInfo);
		removeAllScreens();
		appendElementWithID('body', 'div', attrs = {
				'id' : 'CharacterScreen'
			});
		appendElementWithID('CharacterScreen', 'div', attrs = {
				'id' : 'characterOptions',
				'style' : '\
					width:100%;'
			});
		generateSubmitButton('characterOptions', 'backToMain', 'Main Menu', 'game.getCharacterInfo(game.menuScreen)','');
		generateSubmitButton('characterOptions', 'showDetailed', 'Show Detail', '', '');
		appendElementWithID('CharacterScreen', 'div', attrs = {
				'id' : 'PlayerStats',
				'style' : '\
					width:100%;'
			});
		appendElementWithID('PlayerStats','div', attrs ={
				'id' : 'PlayerAttributes',
				'style' : '\
					display:inline-block;\
					border-radius:14px;\
					padding:15px;',
		});
		generateSkillPointInfo('PlayerAttributes', 'int', 'Intelligence', characterInfo, 4);
		generateSkillPointInfo('PlayerAttributes', 'dex', 'Dexterity', characterInfo, 5);
		generateSkillPointInfo('PlayerAttributes', 'str', 'Strength', characterInfo, 6);
		generateSkillPointInfo('PlayerAttributes', 'con', 'Constitution', characterInfo, 7);
		generateSkillPointInfo('PlayerAttributes', 'foc', 'Focus', characterInfo, 8);

		characterLevelScreenAddition(characterInfo);
	};

	// This function may be expanded upon in the future.
	game.inventoryScreen = function (characterInfo) {
		verifyCharacterInfo(characterInfo);
		removeAllScreens();
		appendElementWithID('body', 'div', attrs = {
				'id' : 'InventoryScreen'
			});
		appendElementWithID('InventoryScreen', 'div', attrs = {
				'id' : 'characterInventory'
			});
		generateSubmitButton('characterInventory', 'backToMain', 'Main Menu', 'game.getCharacterInfo(game.menuScreen)', '');
	};
	
	// This function may be expanded upon in the future.
	game.rankingsScreen = function (characterInfo) {
		verifyCharacterInfo(characterInfo);
		removeAllScreens();
		appendElementWithID('body', 'div', attrs = {
				'id' : 'RankingsScreen'
			});
		appendElementWithID('RankingsScreen', 'div', attrs = {
				'id' : 'playerRankings',
			});
		generateSubmitButton('playerRankings', 'backToMain', 'Main Menu', 'game.getCharacterInfo(game.menuScreen)', '');
		appendElementWithID('playerRankings', 'span', attrs = {
				'id' : 'RankText',
			});
		updateTextWithID('RankText', 'Top 10');
		findTopRank('playerRankings');
	};
	
	// This function may be expanded upon in the future.
	game.settingsScreen = function (characterInfo) {
		verifyCharacterInfo(characterInfo);
		removeAllScreens();
		appendElementWithID('body', 'div', attrs = {
				'id' : 'SettingsScreen'
			});
		appendElementWithID('SettingsScreen', 'div', attrs = {
				'id' : 'gameSettings'
			});
		appendElementWithID('SettingsScreen', 'div', attrs = {
				'id' : 'playerSettings'
			});
		generateSubmitButton('gameSettings', 'backToMain', 'Main Menu', 'game.getCharacterInfo(game.menuScreen)', '');
	};

	// When the document.onload triggers the game will start.
	// This function may be expanded upon in the future.
	window.onload = start();
}
();
