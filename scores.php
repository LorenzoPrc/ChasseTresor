<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel= "stylesheet" href = "css/bootstrap.min.css">
    <link rel= "stylesheet" href = "css/styleScore.css">
    <title>Scores</title>
</head>

<body>

    <?php

    require_once("php/modele.php"); 
    session_start();

    ?>

    <form id = 'filtre' method = 'post' action = 'php/filtrerJoueur.php'>

        <b>Filtre :</b>

        <select name = "idJoueur" onchange = "filtre.submit()">

            <option value = "0">Tous</option>

            <?php

            $joueurs = lireJoueurs();
            $filtreIdJoueur = "0";

            if(isset($_SESSION["filtreIdJoueur"]) && $_SESSION["filtreIdJoueur"] != "0"){

                $filtreIdJoueur = $_SESSION["filtreIdJoueur"];
                $scores = lireJoueurScores($filtreIdJoueur);
        
            }else{
                
                $scores = lireScores();
            }

            foreach ($joueurs as $joueur) {

                $id = $joueur["joueur_Id"];
                $pseudo = $joueur["joueur_Pseudo"];
                $selected = "";
        
                if ($filtreIdJoueur == $id){
        
                  $selected = "selected";
                }
        
                echo ("<option value=\"$id\" $selected> $pseudo </option>\n");
              
            }?>
        
        </select>

    </form>

    <?php 
    
    $i = 1;

    echo("<table>");

    echo("<tr>");
    echo("<td> Rang </td>");
    echo("<td> Heure </td>");
    echo("<td> Niveau </td>");
    echo("<td> Difficulté </td>");
    echo("</tr>");

    foreach($scores as $unScore){

        echo("<tr>");

        echo("<td>".$i." - "."</td>");
        echo("<td>".$unScore['score_Valeur']."</td>");
        echo("<td>".$unScore['score_Niveau']."</td>");
        echo("<td>".$unScore['score_Difficulte']."</td>");

        echo("</tr>");
        $i ++;
    }

    echo("</table>");

    ?>
    
</body>
</html>