<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="content='width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, user-scalable=0'" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta http-equiv="X-UA-Compatible" content="IE=9" >
	<title>SubFi.Game.V2</title>
	<script type="text/javascript" src="../js/phaser.js"></script>
	<script type="text/javascript" src="../js/client.js"></script>
	<script type="text/javascript" src="../js/io.js"></script>
	<script type="text/javascript" src="../js/load.js"></script>
</head>
<body>
	<?php
		session_start();
		ini_set('session.cache_limiter','public');
		session_cache_limiter(false);
		$checkLogged = $_SESSION['logged'];
		if (!$checkLogged) {
			header("Location:../../html/index.html")
			exit();
		} else {
			header("Location:../html/main.html");
			$_SESSION['logged'] = $checkLogged;
		}
	?>
</body>
</html>