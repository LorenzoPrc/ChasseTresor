<?php

require_once("modele.php");

try {

  session_start();
  $nom = $_REQUEST["nomJoueur"];
  $mdp = $_REQUEST["mdpJoueur"];

  $_SESSION["nom"] = $nom;

  if(verifierConnexion($nom, $mdp)){

    $_SESSION['erreurConnexion'] = 'problème';
    header("location:../Index.php");

  }else{

    header("location:../choixDifficulte.php");

  }

}catch (Exception $e){

  echo("Houston, on a un problème : ") . $e->getMessage ();

}

?>