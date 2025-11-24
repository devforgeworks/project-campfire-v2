const eCardFlip1 = document.getElementById("enemyCardFlip1");
const eCardFlip2 = document.getElementById("enemyCardFlip2");
const pCardFlip1 = document.getElementById("playerCardFlip1");
const pCardFlip2 = document.getElementById("playerCardFlip2");
const dice = document.getElementById("dice");
const newRound = document.getElementById ("newRound");
const resBtn = document.getElementById("resetBtn");
const skillBtns = document.getElementsByClassName("abBtn");
let xwhoTurn = document.getElementById("whoTurn");

// knappar för att öka stats
const incSTR = document.getElementById("incStr");
const incDEX = document.getElementById("incDex");
const incINT = document.getElementById("incInt");
const incVIT = document.getElementById("incVit");

const xhealSpell = document.getElementById("healSpell");

var playerCard1 = document.getElementById("pCard1");
var playerCard2 = document.getElementById("pCard2");
var enemyCard1 = document.getElementById("eCard1");
var enemyCard2 = document.getElementById("eCard2");
var roundCount = document.getElementById("roundCounter");

var comLog = document.getElementById("comLog");

// skillBtns.style.visibility ="hidden";


// for (let btn of skillBtns){
//     btn.style.visibility = "hidden";
// }

var pHp = document.getElementById("pHealth");
var pAC = document.getElementById("pAC");



var pStr = document.getElementById("pStr");
var pDex = document.getElementById("pDex");
var pInt = document.getElementById("pInt");
var pVit = document.getElementById("pVit");

var eHp = document.getElementById("eHp");
var eAc = document.getElementById("eAc");



var round = 1;


let playerBaseSTR = 10;
let playerBaseDEX = 10;
let playerBaseINT = 10;
let playerBaseVIT = 10;


var playerHP = 10;
var playerAC = 10;
var playerSTR = 10;
var playerDEX = 10;
var playerINT = 10;
var playerVIT = 10;

// let strBonus = 0;
// let dexBonus = 0;
// let intBonus = 0;
// let vitBonus = 0;

var enemyAC = 10;
var enemyHP = 10;

eHp.innerText = enemyHP;
eAc.innerText = enemyAC;

let comLogQeue = [];
let isWriting = false;
xhealSpell.disabled = true;
xhealSpell.style.opacity = 0.2;

roundCount.innerText = round;
pHp.innerText = playerHP;
pAC.innerText = playerAC;
pStr.innerText = playerSTR;
pDex.innerText = playerDEX;
pInt.innerText = playerINT;
pVit.innerText = playerVIT;

// skapa egna handlers för alla knapppar "clickHandlerStr() iställer för de som står nedan ex."
incSTR.addEventListener("click", () => clickHandler(1));
incDEX.addEventListener("click", () => clickHandler(2));
incINT.addEventListener("click", () => clickHandler(3));
incVIT.addEventListener("click", () => clickHandler(4));

xhealSpell.onclick = function(){
    let newPlayerHP = playerHP + 5;
    playerHP = newPlayerHP;
    pHp.innerText = playerHP;
    xhealSpell.disabled = true;
    spellCount = 0;
}



newRound.style.visibility ="hidden"
resBtn.style.visibility ="hidden";
incSTR.disabled = true;
incDEX.disabled = true;
incINT.disabled = true;
incVIT.disabled = true;

let spellCount = 0;
let totalClicks = 0;
let maxClick = 5;
let maxClickBase = 5;

function clickHandler(btnNumber){
    if(maxClick === totalClicks){
        return;
    }
    
    if(btnNumber === 1){
        playerSTR++;
        totalClicks++;
        pStr.innerText = playerSTR;
        
    } else if(btnNumber === 2){
        playerDEX++;
        totalClicks ++;
        pDex.innerText = playerDEX;

    } else if(btnNumber === 3){
        playerINT++;
        totalClicks++;
        pInt.innerText = playerINT;

    } else if (btnNumber === 4){
        playerVIT++;
        totalClicks++;
        pVit.innerText = playerVIT;

        playerHP = playerHP + bonuses().vitBonus;
        pHp.innerText = playerHP;
        
        
    }


}



function diceRoll(min, max){
    var diceRoll = Math.floor(Math.random()*(max-min +1)+min);
    dice.innerText = diceRoll;
    return diceRoll;
    
}

function d8roll(min, max){
    var d8roll = Math.floor(Math.random()* (max - min + 1)+min);
    return d8roll;
}

function addComLog(message){
    comLogQeue.push(message);

    if(!isWriting){
        processNextMessage();
    }
}

function processNextMessage(){
    if (comLogQeue.length === 0){
        isWriting = false;
        return;
    }

    isWriting = true;
    let currentMessage = comLogQeue.shift();
    

    let comEntry = document.createElement("div");
    comEntry.innerText = currentMessage;

    comLog.appendChild(comEntry);
    comLog.scrollTop = comLog.scrollHeight;

    processNextMessage();

}


dice.onclick = function(){
    dice.disabled = true;
    setTimeout(playerAttack, 1000);
    setTimeout(enemyDead, 1001);
    setTimeout(enemyAttack, 2000);
    setTimeout(playerDead, 2001);
    // kom ihåg den här nedan.
    setTimeout(() => {dice.disabled=false;}, 2005);
    
    spellCount ++;

    if(spellCount === 5){
        setTimeout(() => {xhealSpell.disabled=false;},2006);
        setTimeout(() => {xhealSpell.style.opacity=1;},2006);
        // xhealSpell.disabled = false;
        
    }

    
}


    
function bonuses(){
        let strBonus = Math.floor((playerSTR - playerBaseSTR)/2);
        let dexBonus = Math.floor((playerDEX - playerBaseDEX)/2);
        let intBonus = Math.floor((playerINT - playerBaseINT)/2);
        let vitBonus = 2;

        return{strBonus:strBonus, dexBonus:dexBonus, intBonus:intBonus, vitBonus:vitBonus}
}



function playerAttack(){
    
    xwhoTurn.innerText = "Your turn";

    if(playerHP <= 0 || enemyHP <= 0) return;

    // Kolla om dessa bonusar kan ingå i själva inc av str, dex osv.
    // Skapa en variabel som placeholder? För att sedan slama den i rollen?
    // Men bonusen funkar som den ska nu.
    
    
    
    var hitRoll = diceRoll(1,20) + bonuses().dexBonus;
    

    if (hitRoll>=enemyAC){
        

        var attackRoll = d8roll(1, 8) + bonuses().strBonus;
        enemyHP = enemyHP - attackRoll;

        eHp.innerText = enemyHP;

        message = "You roll " + hitRoll + " ("+ bonuses().dexBonus + " bonus)" + " and hit the enemy for: " +attackRoll+ "(" + bonuses().strBonus + " bonus)" + "  damage" ;
        
    }else{
        message = "You roll: "+hitRoll+ " and miss...";
        
    }

    addComLog(message);

}

function enemyAttack(){

    xwhoTurn.innerText = "Enemy Turn";

    if(enemyHP <= 0 || playerHP <= 0 ) return;

    var hitRoll = diceRoll(1,20);

    let message = "";

    if (hitRoll >= playerAC){
        var attackRoll = d8roll (1, 8);
        playerHP = playerHP - attackRoll;

        pHp.innerText = playerHP;

        message = "The enemy rolls " + hitRoll + " and hits you for " + attackRoll + " damage";
        
        }else{
            message = "The enemy rolls " + hitRoll + " and misses you"
            
        }

        addComLog(message);

}


function playerDead(){
    if(playerHP > 0) return;

    pHp.innerText = "You died..."
    dice.disabled = true;
    dice.style.opacity = 0.2;
    resBtn.style.visibility ="visible";   
}

resBtn.onclick = function(){
    location.reload();
}

function enemyDead(){
    if (enemyHP > 0) return;

    eHp.innerText = "The enemy is defeated!"
    dice.disabled = true;
    dice.style.opacity = 0.2;

    newRound.style.visibility = "visible"
    dice.disabled = false;
    dice.style.opacity = 1;
    
    incSTR.disabled = false;
    incDEX.disabled = false;
    incINT.disabled = false;
    incVIT.disabled = false;

    
}

    





var eHPinc = 3;
var eACinc = 2;

function HPINC(){
    eHPbase = 10;
    eACbase = 10;
    var newEnemyHP = eHPbase + eHPinc;
    enemyHP = newEnemyHP;
    eHp.innerText = enemyHP;

    var newEnemyAC = eACbase + eACinc;
    enemyAC = newEnemyAC;
    eAc.innerText = enemyAC;

    eHPinc = eHPinc + 3;
    eACinc = eACinc + 3;

    incSTR.disabled = true;
    incDEX.disabled = true;
    incINT.disabled = true;
    incVIT.disabled = true;

    let newPlayerHP = playerHP + 5;
    playerHP = newPlayerHP;
    pHp.innerText = playerHP;
}





newRound.onclick = function(){
    HPINC();
    round ++;
    roundCount.innerText = round;
    newRound.style.visibility ="hidden"
    maxClick = maxClick + 5;

}



pCardFlip1.onclick= function(){
    playerCard2.style.visibility ="visible";
}

pCardFlip2.onclick = function(){
    playerCard2.style.visibility = "hidden";
}

eCardFlip1.onclick = function(){
    enemyCard2.style.visibility = "visible";
}

eCardFlip2.onclick = function(){
    enemyCard2.style.visibility = "hidden";

}

