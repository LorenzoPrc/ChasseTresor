<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <link rel= "stylesheet" href = "css/bootstrap.min.css">
    <link rel= "stylesheet" href = "css/styleMenus.css">
    <title>Identification</title>

</head>
<body>

    <div class = "container-fluid">

        <div class = "container">

        <?php

        session_start();

        if(isset($_SESSION['erreurConnexion']) && $_SESSION['erreurConnexion'] != ""){

            echo("<div class = 'erreur'> Mauvais Pseudo / Mot de passe </div>");
            $_SESSION['erreurConnexion'] = "";

        }

        ?>

            <h1 id = "intro"> Veuillez vous identifier soldat </h1>

            <form action = "php/connexionJoueur.php" method = "post">

                <div>

                    <div class = "jouerIntro">
                        
                        <input type = "text" name = "nomJoueur" value = "" placeholder = "Pseudo" required />
                        <input type = "password" name = "mdpJoueur" value = "" placeholder = "Mot de Passe" required />

                    </div>    

                </div>

                <div class = "jouerIntro">

                    <input type = "submit" class = "input" name = "connexion" value = "Connexion"/>

                </div>
            
            </form>

            <form action = "InscriptionJoueur.php" method = "post">

                <div class = "jouerIntro" id = "btnInscription">

                    <input type = "submit" class = "input" name = "inscription" value = "S'inscrire"/>

                </div>
            
            </form>

        </div>

    </div>
    
</body>
</html>