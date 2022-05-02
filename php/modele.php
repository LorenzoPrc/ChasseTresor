<?php

function connexion(){ //permet de se connecter à la base

    return new PDO("mysql:host=localhost;dbname=jeu;charset=utf8","root","root");
}

function lireJoueurs(){ //rend la collection de tous les joueurs

    $pdo = connexion();
    return $pdo -> query("SELECT * FROM joueur ORDER BY joueur_Pseudo") -> fetchAll();
}

function lireScores(){ //rend la collection de tous les scores

    $pdo = connexion();
    return $pdo -> query("SELECT * FROM score ORDER BY score_Difficulte, score_Valeur") -> fetchAll();
}

function lireJoueurScores($id){
    
    $pdo = connexion();
    $res = $pdo -> prepare("SELECT * FROM score WHERE score_IdJoueur=:idJoueur");
    $res -> bindParam (":idJoueur",$id,PDO::PARAM_INT);
    $res -> execute();
    
    return $res -> fetchAll();
}

function obtenirIdJoueur($nomJoueur){ //renvoie l'id du joueur courant

    $pdo = connexion(); 
    return $pdo -> query("SELECT joueur_Id FROM joueur WHERE joueur_Pseudo = '$nomJoueur'") -> fetchAll();
}

function ajouterJoueur($nom, $mdp){ //ajoute un joueur dans la base

    $pdo = connexion();
    $req = $pdo->prepare("INSERT INTO joueur(joueur_Pseudo, joueur_Mdp) VALUES (:nom, :mdp)");
    $req->bindParam ("nom",$nom,PDO::PARAM_STR,20);
    $req->bindParam ("mdp",$mdp,PDO::PARAM_STR,40);
    $req->execute();
}

function verifierJoueur($nom){ //verifie la présence d'un nom dans la base de données

    $pdo = connexion();
    $res = $pdo -> query("SELECT joueur_Pseudo FROM joueur WHERE joueur_Pseudo = '$nom'") -> fetchAll();
    
    return empty($res);
    
}

function verifierConnexion($nom, $mdp){ //verifie l'authenticité d'un utilisateur

    $pdo = connexion();
    $res = $pdo -> query("SELECT * FROM joueur WHERE joueur_Pseudo = '$nom' AND joueur_Mdp = '$mdp'") -> fetchAll();
    
    return empty($res);
}

function ajouterScore($valeur, $difficulte, $niveau ,$idJoueur){ //ajoute un score dans la base

    $pdo = connexion();
    $req = $pdo->prepare("INSERT INTO score(score_Valeur, score_Difficulte, score_Niveau, score_IdJoueur) VALUES (:valeur, :difficulte, :niveau, :id)");
    $req->bindParam ("valeur",$valeur,PDO::PARAM_STR,10);
    $req->bindParam ("difficulte",$difficulte,PDO::PARAM_STR,10);
    $req->bindParam ("niveau",$niveau,PDO::PARAM_INT);
    $req->bindParam ("id",$idJoueur,PDO::PARAM_INT);
    $req->execute();
}

?>