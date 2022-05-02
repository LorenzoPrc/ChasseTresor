let lignes = document.getElementById('lignes').value
let colonnes = document.getElementById('colonnes').value
let difficulte = document.getElementById('difficulteTransmise').value

let tableau = []
let tableauDejaJoue = []
let tresor = []

let jouer = true
let positions = ['N', 'S', 'E', 'O', 'NE', 'NO', 'SE', 'SO']
let intervale = ''

let minutes = 0
let heures = 0

let minutesAffichees = "00"
let heuresAffichees = "00"

let vies = 5
let niveau = 1
let resultat = ""


/* Création des objets */

class Coups{

    type = ""
    minutes = ""

    constructor(type, minutes){

        this.type = type
        this.minutes = minutes
    }
}

class FinPartie extends Coups{

    message = ""

    constructor(type, minutes, message){

        super(type, minutes)
        this.message = message
    }
}

/* Fin de création des objets*/

function generationTableau(){ //Génère la grille de jeu en distribuant des objets au hasard

    let neutre = new Coups("neutre", 2)

    for(let i = 1; i <= lignes; i++){

        let tableauIntermediaire = []

        for(let j = 1; j <= colonnes; j++){

            tableauIntermediaire.push(neutre)
        }
        
        tableau.push(tableauIntermediaire)
    }
    
    determinationDifficulte(niveau)
    tresor = rechercheTresor()
    choixFond()
}

function apparitionBonusMalus(nombre, type, minutes, message){ //Permet la distribution des objets

    for(let i = 0; i < nombre; i++){

        let lig = Math.floor(Math.random() * lignes)
        let col = Math.floor(Math.random() * colonnes)

        while(tableau[lig][col].type != "neutre"){

            lig = Math.floor(Math.random() * lignes)
            col = Math.floor(Math.random() * colonnes)
        }

        if(type == "neutre" || type == "bonus" || type == "malus"){

            let objet = new Coups(type, minutes)
            tableau[lig][col] = objet

        }else{

            let objet = new FinPartie(type, minutes, message)
            tableau[lig][col] = objet

        }
    }
}

function determinationDifficulte(niveau){ //distribue les objets selon le niveau

    let totalCases = lignes * colonnes
    let bombe = 0
    let bonus = 0
    let malus = 0
    let deplacement = 0
    let tempete = 0
    let radar = 0

    // Il est possible de factoriser les 5 boucles suivantes en une seule mais cela réduira la lisibilité à la correction
    //Bombes
    if(niveau < 3){

        bombe = totalCases * 0.10

    }else if(niveau < 50){

        bombe = totalCases * Math.floor(Math.sqrt(niveau/2)) / 10

    }else{

        bombe = totalCases * 0.50

    }

    //Bonus et Malus
    if(niveau < 5){

        bonus = 0
        malus = 0

    }else if(niveau < 50){

        malus = totalCases * Math.sqrt(niveau + 8) / 35
        bonus = Math.floor(totalCases * 0.3 - malus)

    }else{

        malus = totalCases * 0.20
        bonus = totalCases * 0.10
    }

    //deplacement
    if(niveau < 10){

        deplacement = 0

    }else if(niveau < 50){

        deplacement = totalCases * Math.sqrt(niveau) / 350

    }else{

        deplacement = totalCases * 0.02
    }

    //tempete
    if(niveau < 15){

        tempete = 0

    }else if(niveau < 50){

        tempete = totalCases * Math.sqrt(niveau) / 230

    }else{

        tempete = totalCases * 0.03
    }

    //radar
    if(niveau < 20){

        radar = 0

    }else if(niveau < 35){

        radar = 1

    }else{

        radar = 2
    }

    apparitionBonusMalus(1, "tresor", 1, "gagné")
    apparitionBonusMalus(bombe, "bombe", 1, "perdu")
    apparitionBonusMalus(bonus, "bonus", 1)
    apparitionBonusMalus(malus, "malus",  10)
    apparitionBonusMalus(deplacement, "changement", 1, "attention, la cible change de place")
    apparitionBonusMalus(tempete, "reroll", 1, "tempête de sable")
    apparitionBonusMalus(radar, "radar", 1, "Un radar vous aide et révèle les alentours")

}

function testCase(x,y){ //Fonction principale, permet de réaliser des actions suivant les objets trouvés

    let id = x + "-" + y
    let caseTableau = tableau[x - 1][y - 1].type

    if(heures == 23 && minutes == 59){
        
        resultat = alert("fin du temps imparti")
        jouer = false
        document.getElementById('ajout').submit()
        setTimeout(1500, reinitialisation("totale"))
    }

    if(verifPresence(x, y, tableauDejaJoue) || jouer == false){return}

    tableauDejaJoue.push([x,y])
    changeCouleur(caseTableau, id)
    boussole(x - 1, y - 1)

    if(caseTableau == "bonus" || caseTableau == "malus" || caseTableau == "neutre"){

        augmentationTemps(x,y)

    }else if (caseTableau == "changement" || caseTableau == "reroll" || caseTableau == "radar"){

        augmentationTemps(x,y)
        resultat = alert(tableau[x - 1][y - 1].message)

        if(caseTableau == "changement"){

            changementTresor()
            tresor = rechercheTresor()
            //testTest() // A UTILISER POUR VOIR LA REPARTITION DES OBJETS DE MANIERE CLAIRE

        }else if(caseTableau == "reroll"){

            reinitialisation("non")

        }else{

            positionRevele = reveleCase(x, y, 12)

            for(let i = 0; i < positionRevele.length; i++){

                let a = positionRevele[i][0]
                let b = positionRevele[i][1]

                try{

                    id = a + "-" + b
                    caseTableau = tableau[a - 1][b - 1].type
                    changeCouleur(caseTableau, id)

                }catch{}
            }
        }

    }else{

        augmentationTemps(x,y)

        if(caseTableau == "bombe" && vies > 1){

            vies = vies - 1
            document.getElementById('vies').innerHTML = vies
            resultat = alert("vous perdez une vie !")
            
        }else if(caseTableau == "tresor"){

            let hasard = Math.floor(Math.random() * 3)
            if(hasard == 1){
                
                vies = vies + 1
                document.getElementById('vies').innerHTML = vies
                resultat = alert("Vous bénéficiez d'une vie supplémentaire soldat !")

            }
            
            niveau = niveau + 1
            document.getElementById('niveau').innerHTML = niveau
            resultat = alert("Bravo soldat, vous pouvez poursuivre vers la zone suivante !")
            reinitialisation("non")

        }else{

            resultat = alert(tableau[x - 1][y - 1].message)
            jouer = false
            document.getElementById('ajout').submit()
            setTimeout(1500, reinitialisation("totale"))
        }
    }
}

function augmentationTemps(x,y){ //recupere la propriété de temps de l'objet trouvé et l'ajoute au compteur

    minutes = minutes + tableau[x - 1 ][y - 1].minutes

    if(minutes < 10){

        minutesAffichees = '0' + minutes 

    }else{

        minutesAffichees =  minutes
    }

    if(heures < 10){

        heuresAffichees = '0' + heures

    }else{

        heuresAffichees = heures
    }

    if(minutes > 59){

        minutes = 0
        heures = heures + 1
        minutesAffichees =  "00"

        if(heures < 10){

            heuresAffichees = '0' + heures

        }else{

            heuresAffichees = heures
        }

    }

    document.getElementById('score').innerHTML = minutesAffichees
    document.getElementById('heures').innerHTML = heuresAffichees

    document.getElementById('scoreTransmis').value = heuresAffichees + "h" + minutesAffichees
    document.getElementById('niveauTransmis').value = niveau
}

function verifPresence(x, y, tableau1){ //Cette fonction permet d'éviter de pouvoir appuyer plusieurs fois sur un même bouton

    for(let i = 0; i < tableau1.length; i++){

        if(tableau1[i][0] == x && tableau1[i][1] == y){
            return true
        }
    }
}

function reveleCase(x, y, distance){ // Cette fonction sert à lister les cases autours d'une position donnée

    let tableauRevele = []
    
    i = x
    j = y

    while(x >= i - distance){

        tableauRevele.push([x,y])
        x--
    }

    x = i

    while(x <= i + distance){

        tableauRevele.push([x,y])
        x++
    }

    x = i

    while(y >= j - distance){

        tableauRevele.push([x,y])
        y--
    }

    y = j

    while(y <= j + distance){

        tableauRevele.push([x,y])
        y++
    }

    x = i
    y = j

    while(y >= j - distance){

        tableauRevele.push([x,y])
        y--
        x--
    }

    x = i
    y = j

    while(y <= j + distance){

        tableauRevele.push([x,y])
        y++
        x++
    }

    x = i
    y = j

    while(y >= j - distance){

        tableauRevele.push([x,y])
        y--
        x++
    }

    x = i
    y = j

    while(y <= j + distance){

        tableauRevele.push([x,y])
        y++
        x--
    }

    //Nous enlevons les nombreux doublons de la position initiale
    for(let a = 0; a < tableauRevele.length; a++){

        for(let b = a + 1; b < tableauRevele.length - 1; b++){

            if(tableauRevele[a][0] == tableauRevele[b][0] && tableauRevele[a][1] == tableauRevele[b][1]){

                indice = tableauRevele.indexOf(tableauRevele[b])
                tableauRevele.splice(indice, 1)
            }
        }
    }

    return tableauRevele
}

function boussole(x,y){ //Permet d'aider le joueur grace à la boussole

    let i = tresor[0]
    let j = tresor[1]

    vit = vitesse(x, y, i, j)

    if(y == j){

        if(x > i){

            clignotement('N', vit)

        }else if(x < i){

            clignotement('S', vit)
        }

    }else if(x == i){

        if(y > j){

            clignotement('O', vit)

        }else if(y < j){

            clignotement('E', vit)
        }

    }else{

        if(x > i){

            if(y > j){

                clignotement('NO', vit)

            }else if(y < j){

                clignotement('NE', vit)
            }

        }else if(x < i){

            if(y < j){

                clignotement('SE', vit)
                
            }else if(y > j){

                clignotement('SO', vit)
                
            }
        } 
    }  
}

//Ces 4 fonctions servent toujours à la boussole

function rechercheTresor(){

    for(let x = 0; x < colonnes; x++){

        for(let y = 0; y < lignes; y++){

            if(tableau[x][y].type == "tresor"){

                return [x,y]
        
            }
        }
    }
}

function coloration(id, couleur){

    document.getElementById(id).style.background = couleur
    
    setTimeout(() => {document.getElementById(id).style.background = "grey"}, 100)
}

function stopInterval(){

    clearInterval(intervale)

    for (let i = 0; i < positions.length; i++){
        
        document.getElementById(positions[i]).style.background = "grey"
    }
}

function clignotement(id, vitesse){

    stopInterval()

    if(vitesse == "rapide"){

        intervale = setInterval(coloration, 500, id, "red")

    }else if(vitesse == "moyen"){

        intervale = setInterval(coloration, 1000, id, "orange")

    }else{

        intervale = setInterval(coloration, 1500, id, "blue")
    }
}

function vitesse(x, y, i, j){

    let a = Math.abs(x - i)
    let b = Math.abs(y - j)

    if(x == i || y == j){

        if(a == 1 || b == 1){

            return "rapide"

        }else if(a == 2 || b == 2){

            return "moyen"

        }else{

            return "normal"
        }

    }else{

        let p = Math.pow(a,2)
        let q = Math.pow(b,2)
        let pyth = Math.floor(Math.sqrt(p + q))
        console.log(pyth)

        if(pyth == 1){

            return "rapide"

        }else if(pyth == 2){

            return "moyen"

        }else{

            return "normal"
        }


    }
}

// Fin des fonctions de la boussole

function changeCouleur(maCase, id){ //Change la couleur d'une case suivant l'objet qu'elle contient

    if(maCase == "bonus"){
        document.getElementById(id).setAttribute("class", "case bonus")
    }else if(maCase == "malus"){
        document.getElementById(id).setAttribute("class", "case malus")
    }else if(maCase == "neutre"){
        document.getElementById(id).setAttribute("class", "case neutre")
    }else if(maCase == "tresor"){
        document.getElementById(id).setAttribute("class", "case tresor")
    }else if(maCase == "changement"){
        document.getElementById(id).setAttribute("class", "case changement")
    }else if(maCase == "reroll"){
        document.getElementById(id).setAttribute("class", "case reroll")
    }else if(maCase == "radar"){
        document.getElementById(id).setAttribute("class", "case radar")
    }else{
        document.getElementById(id).setAttribute("class", "case bombe")
    }

}

function changementTresor(){ //Change le trésor de place (utilisé pour l'objet "changement")

    let coordonnees = rechercheTresor()
    let x = coordonnees[0]
    let y = coordonnees[1]

    let lig = Math.floor(Math.random() * lignes)
    let col = Math.floor(Math.random() * colonnes)

    while(tableau[lig][col].type != "neutre" || tableauDejaJoue.includes([lig][col])){

        lig = Math.floor(Math.random() * lignes)
        col = Math.floor(Math.random() * colonnes)
    }

    tableau[lig][col] = tableau[x][y]

    lig = Math.floor(Math.random() * lignes)
    col = Math.floor(Math.random() * colonnes)

    while(tableau[lig][col].type != "neutre" || tableauDejaJoue.includes([lig][col])){

        lig = Math.floor(Math.random() * lignes)
        col = Math.floor(Math.random() * colonnes)
    }

    tableau[x][y] = tableau[lig][col]
            
}

function reinitialisation(valeur){ //rejoue la partie en gardant les minutes (objet "reroll") ou recommence la partie suivant le parametre

    if(valeur == "totale"){

        jouer = true
        niveau = 1
        minutes = 0
        heures = 0
        vies = 3
        resultat = ""

        document.getElementById('niveau').innerHTML = niveau
        document.getElementById('score').innerHTML = minutes
        document.getElementById('heures').innerHTML = heures
        document.getElementById('vies').innerHTML = vies
    }

    for(let x = 0; x < colonnes; x++){

        for(let y = 0; y < lignes; y++){

            let id = (x+1) + "-" + (y+1)
            document.getElementById(id).setAttribute("class", "case nonJoue")
            
        }
    }

    tableau = []
    tableauDejaJoue = []
    
    generationTableau()
    tresor = rechercheTresor()
    stopInterval()
    //testTest() // A UTILISER POUR VOIR LA REPARTITION DES OBJETS DE MANIERE CLAIRE
}

function ouvrirPopup(page){ //ouvre une page annexe

    window.open(page)
}

function choixFond(){ //permet de varier le fond du jeu

    let a = Math.floor(Math.random() * 3)

    if((heures > 6 && heures < 10) || (heures > 18 && heures < 21)){

        if(a == 1){

            document.body.style.backgroundImage = "url('css/images/fond1.jpg')"

        }else if(a == 2){

            document.body.style.backgroundImage = "url('css/images/fond2.jpg')"

        }else{

            document.body.style.backgroundImage = "url('css/images/fond3.jpg')"
        }
        
        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundSize = "cover"

    }else if((heures >= 0 && heures <= 6) || (heures > 21 && heures < 24)){

        if(a == 1){

            document.body.style.backgroundImage = "url('css/images/fond4.jpg')"

        }else if(a == 2){

            document.body.style.backgroundImage = "url('css/images/fond5.jpg')"

        }else{

            document.body.style.backgroundImage = "url('css/images/fond6.jpg')"
        }

        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundSize = "cover"

    }else{

        if(a == 1){

            document.body.style.backgroundImage = "url('css/images/fond7.jpg')"

        }else if(a == 2){

            document.body.style.backgroundImage = "url('css/images/fond8.jpg')"

        }else{

            document.body.style.backgroundImage = "url('css/images/fond9.jpg')"
        }

        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundSize = "cover"
    }
}

// Fonctions de test 

function testProgram(x,y){ // A UTILISER POUR VOIR LA REPARTITION DES OBJETS DE MANIERE CLAIRE

    let id = x + "-" + y
    let caseTableau = tableau[x-1][y-1].type
    changeCouleur(caseTableau, id)
}

function testTest(){ // A UTILISER POUR VOIR LA REPARTITION DES OBJETS DE MANIERE CLAIRE

    for(let test = 1; test <= lignes; test++){

        for(let test1 = 1; test1 <= colonnes; test1++){

            testProgram(test, test1)
        }
    }
}


window.onload = generationTableau()
//testTest() //A UTILISER POUR VOIR LA REPARTITION DES OBJETS DE MANIERE CLAIRE
document.getElementById('score').innerHTML = minutesAffichees
document.getElementById('heures').innerHTML = heuresAffichees
document.getElementById('vies').innerHTML = vies
document.getElementById('niveau').innerHTML = niveau



