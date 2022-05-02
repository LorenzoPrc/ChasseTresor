<?php

session_start ();

$_SESSION["filtreIdJoueur"] = $_REQUEST["idJoueur"];

header("location: ../scores.php");

?>