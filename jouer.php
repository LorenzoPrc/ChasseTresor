<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <link rel= "stylesheet" href = "css/bootstrap.min.css">
    <link rel= "stylesheet" href = "css/style.css">
    <title>Jeu</title>
    
</head>

<body>
    
    <div class = "container-fluid">

        <div class = "row">

            <article class = "col-xs-12 col-sm-12 col-md-3 col-lg-3">

                <div id = 'boussole'>

                    <table class = 'boussole'>

                        <tr>
                            <td></td>
                            <td></td>
                            <td class = 'caseB' id = 'N'>N</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td class = 'caseB' id = 'NO'>N-O</td>
                            <td class = 'caseB'></td>
                            <td class = 'caseB' id = 'NE'>N-E</td>
                            <td></td>     
                        </tr>
                        <tr>
                            <td class = 'caseB' id = 'O'>O</td>
                            <td class = 'caseB'></td>
                            <td class = 'caseB'></td>
                            <td class = 'caseB'></td>
                            <td class = 'caseB' id = 'E'>E</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td class = 'caseB' id = 'SO'>S-O</td>
                            <td class = 'caseB'></td>
                            <td class = 'caseB' id = 'SE'>S-E</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td class = 'caseB' id = 'S'>S</td>
                            <td></td>
                            <td></td>
                        </tr>

                    </table>

                </div>

            </article>

            <article class = "col-xs-12 col-sm-12 col-md-6 col-lg-6">
                
                <?php

                $lignes = $_REQUEST["lignes"];
                $colonnes = $_REQUEST["colonnes"];
                $difficulte = $_REQUEST['difficulte'];
                
                echo("<table>");

                $i = 1;

                while($i <= $colonnes){

                    echo("<tr>");
                    $j = 1;

                    while($j <= $lignes){

                        echo("<td class = 'case nonJoue' id = '$i-$j' onclick = 'testCase($i,$j)'></td>");

                        $j++;
                    }

                    echo("</tr>");
                    $i++;
                }

                echo("</table>");
                
                echo("<input type = 'text' value = '$lignes' id = 'lignes' hidden disabled>");
                echo("<input type = 'text' value = '$colonnes' id = 'colonnes' hidden disabled>");

                echo("<form action = 'php/ajouterScore.php' method = 'post' id = 'ajout' required hidden disabled>");
                echo("<input type = 'text' name = 'score' value = '' id = 'scoreTransmis' /> ");
                echo("<input type = 'text' name = 'difficulte' value = $difficulte id = 'difficulteTransmise' /> ");
                echo("<input type = 'number' name = 'niveau' value = '' id = 'niveauTransmis' /> ");
                echo("</form>"); 
                
                ?>

            </article>

            <article class = "col-xs-12 col-sm-12 col-md-3 col-lg-3">

                <div id = "infos">

                    <span> 
                        
                        Niveau : <span id = 'niveau'></span>
                        
                        <div>

                            <span id = 'heures'></span>h<span id = 'score'></span> 
                            | 
                            Vies : <span id = 'vies'></span>

                        </div>
                    
                    </span>
                        
                </div>
            
            </article>
            

        </div>

    </div>

    <script src = 'script.js'></script>
</body>
</html>