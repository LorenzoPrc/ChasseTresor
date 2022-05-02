<?php

require_once("modele.php");

try {

    session_start();

    $nomJoueur = $_SESSION["nom"];
    $valeur = $_REQUEST['score'];
    $difficulte = $_REQUEST['difficulte'];
    $niveau = $_REQUEST['niveau'];
    $idJoueur = obtenirIdJoueur($nomJoueur);

    $idJuste = $idJoueur[0]['joueur_Id'];

    ajouterScore($valeur, $difficulte, $niveau, $idJuste);
  
}catch (Exception $e){

    echo("Houston, on a un problème : ") . $e->getMessage ();

}

header("location:../choixDifficulte.php");

?>