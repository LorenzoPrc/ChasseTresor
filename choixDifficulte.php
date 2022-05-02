<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <link rel= "stylesheet" href = "css/bootstrap.min.css">
    <link rel= "stylesheet" href = "css/styleMenus.css">
    <title>Bienvenue</title>
    
</head>

<body>
    
    <?php 

    session_start();
    $nom = $_SESSION["nom"];
    unset($_SESSION['difficulte']);
    

    ?>

    <div class = "container-fluid">

        <div class = "row">

            <article class = "col-xs-12 col-sm-12 col-md-2 col-lg-2">

                <div id = "infos">

                    <span> 

                        <a href = "javascript:ouvrirPopup('scores.php')"> Scores</a>
                        | 
                        <a href = "javascript:ouvrirPopup('regles.php')"> Règles</a>

                    </span>
                
                </div>
            
            </article>

            <article class = "col-xs-12 col-sm-12 col-md-8 col-lg-8">

                <h1 id = "intro"> Choissisez votre difficulté <?php echo($nom) ?> ! </h1>

                <form action = "jouer.php" method = "post">

                    <div>

                        <div><input type = "text" name = "colonnes" value = "6" hidden required /></div>    
                        <div><input type = "text" name = "lignes" value = "6" hidden required /></div>
                        <div><input type = "text" name = "difficulte" value = "Facile" hidden required /></div>

                    </div>

                    <div class = "jouerIntro">

                        <input type = "submit" class = "input" name = "facile" value = "Facile"/>

                    </div>

                </form>

                <br>

                <form action = "jouer.php" method = "post">

                    <div>

                        <div><input type = "text" name = "colonnes" value = "10" hidden required /></div>    
                        <div><input type = "text" name = "lignes" value = "10" hidden required /></div>
                        <div><input type = "text" name = "difficulte" value = "Moyen" hidden required /></div>

                    </div>

                    <div class = "jouerIntro">

                        <input type = "submit" class = "input" name = "moyen" value = "Moyen"/>

                    </div>

                </form>

                <br>

                <form action = "jouer.php" method = "post">

                    <div>

                        <div><input type = "text" name = "colonnes" value = "12" hidden required /></div>    
                        <div><input type = "text" name = "lignes" value = "12" hidden required /></div>
                        <div><input type = "text" name = "difficulte" value = "Difficile" hidden required /></div>

                    </div>

                    <div class = "jouerIntro">
                        
                        <input type = "submit" class = "input" name = "difficile" value = "Difficile"/>
                        
                    </div>

                </form>

            </article>
        
        </div>

    </div>

    <script src = 'script.js'></script>
    
</body>
</html>