<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <link rel= "stylesheet" href = "css/bootstrap.min.css">
    <link rel= "stylesheet" href = "css/styleMenus.css">
    <title>Inscription</title>

</head>

<body>

    <?php

    session_start();

    if(isset($_SESSION['erreurPseudo']) && $_SESSION['erreurPseudo'] != ""){

        echo("<div class = 'erreur'> Un soldat porte déjà ce nom, veuillez en choisir un autre</div>");
        $_SESSION['erreurPseudo'] = "";

    }elseif(isset($_SESSION['erreurMdp']) && $_SESSION['erreurMdp'] != ""){

        echo("<div class = 'erreur'> Mauvaise correspondance de mots de passe</div>");
        $_SESSION['erreurMdp'] = "";
    }

    ?>

    <h1 id = "intro"> Veuillez décliner votre identité soldat </h1>

    <form action = "php/ajouterJoueur.php" method = "post">

        <div>

            <div class = "jouerIntro">
                
                <input type = "text" name = "nomJoueur" value = "" placeholder = "Pseudo" required />
                <input type = "password" name = "mdpJoueur" value = "" placeholder = "Mot de Passe" required />
                <input type = "password" name = "confMdpJoueur" value = "" placeholder = "Confirmer Mot de Passe" required />

            </div>    

        </div>

        <div class = "jouerIntro">

            <input type = "submit" class = "input" name = "inscription" value = "S'inscrire"/>

        </div>
    
    </form>
    
</body>
</html>