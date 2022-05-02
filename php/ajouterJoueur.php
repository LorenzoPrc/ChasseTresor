<?php

require_once("modele.php");

try {

  session_start();
  $nom = $_REQUEST["nomJoueur"];
  $mdp = $_REQUEST["mdpJoueur"];
  $confMdp = $_REQUEST["confMdpJoueur"];

  $_SESSION["nom"] = $nom;

  if(verifierJoueur($nom) && ($mdp == $confMdp)){

    ajouterJoueur($nom, $mdp);
    header("location:../choixDifficulte.php");

  }else{

    if(verifierJoueur($nom) && !($mdp == $confMdp)){

      $_SESSION['erreurMdp'] = "problème";
    
    }else{

      $_SESSION['erreurPseudo'] = "problème";

    }

    header("location:../inscriptionJoueur.php");
  } 


}catch (Exception $e){

  echo("Houston, on a un problème : ") . $e->getMessage ();

}

?>