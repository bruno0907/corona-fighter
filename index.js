const body = document.querySelector('body')

window.addEventListener('load', function() {
    body.setAttribute("style", "opacity: 1")
})

const area = document.getElementById("area")

const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")


const hp = document.getElementById("hp")
const ammoCounter = document.getElementById("ammoCounter")
const pointsCounter = document.getElementById("pointsCounter")  


const hpBar = document.querySelector(".hp-bar-fill")
const hpBarFill = hpBar.clientHeight


const ammoBar = document.querySelector(".ammo-bar-fill")
const ammoBarFill = ammoBar.clientHeight




const gameover = "<h1 class=gameover>YOU HAVE DIED !!!!</h1>" 
const howTo = "<h1 style=color:red>Clique nos coroninhas para ganhar pontos e vida</h1><h1>E</h1><h1 style=color:#3e7394>nos frascos de alcool em gel para reabaster</h1>"

pointsCounter.innerHTML = parseFloat(0)
ammoCounter.innerHTML = ammoBarFill * 100 / ammoBarFill
hp.innerHTML = hpBarFill * 100 / hpBarFill

let gameRunning // INTERVAL ID OF BALLS
let deployingAmmo // INTERVAL ID OF AMMO

startBtn.addEventListener('click', startGame)
resetBtn.addEventListener('click', resetGame)

function loadingHandle(){
    area.innerHTML = howTo
    area.classList.add('disabled')        
    resetBtn.classList.add('button-disabled')   

}
loadingHandle()


function sfxPlay(audio) {
    audio = new Audio(audio)  
    audio.play()
}

function takeDmg(){ 
    hp.innerHTML--    
    if (hp.innerHTML == parseFloat(0)){
        stopGame()
        area.innerHTML = gameover
        sfxPlay("gameover.sfx")
    }
}

function gainHp(){  
    return hp.innerHTML++
}

function gainAmmo(){
    let totalAmmo = parseFloat(ammoCounter.innerHTML) 
    ammoCounter.innerHTML = totalAmmo + parseFloat(6);
    sfxPlay("alcool.mp3")
}

// function shoot(){    
//     if (ammoCounter.innerHTML > parseFloat(0)){
//         ammoCounter.innerHTML--
//     }
//     if (ammoCounter.innerHTML == parseFloat(0)){
//         stopGame()   
//         area.innerHTML = gameover 
//         sfxPlay("gameover.mp3")       
//     }
//     sfxPlay("spray.mp3")
// }

function shoot(){    
    if (ammo > 0){
        ammo - 10
        console.log(ammo)
    }
    if (ammo == 0){
        stopGame()   
        area.innerHTML = gameover 
        //sfxPlay("gameover.mp3")       
    }
    sfxPlay("spray.mp3")
}



function addBall(){  
    const ball = document.createElement("img")  
    ball.setAttribute("src", "coronavirus.svg") 
    ball.setAttribute("class", "ball")
    let leftPos = Math.floor(Math.random() * 95)
    let topPos = Math.floor(Math.random() * 85)
    ball.setAttribute("style", "left:"+leftPos+"%;top:"+topPos+"%")
    ball.setAttribute("onclick", "popBall(this)")  
    area.appendChild(ball);
    takeDmg()
}

function addAmmo(){   
    const ammo = document.createElement("img") 
    ammo.setAttribute("src", "alcool.svg")
    ammo.setAttribute("class", "ammo")
    let leftPos = Math.floor(Math.random() * 95)
    let topPos = Math.floor(Math.random() * 85)
    ammo.setAttribute("style", "left:"+leftPos+"%;top:"+topPos+"%")
    ammo.setAttribute("onclick", "getAmmo(this)")   
    area.appendChild(ammo);
}

function popBall(el){
    el.setAttribute("src", "corona-splash.svg")
    setTimeout(() => {     
    area.removeChild(el)
    pointsCounter.innerHTML++   
    gainHp()  
    sfxPlay("fart.mp3")}, 250)
}

function getAmmo(el){
    area.removeChild(el)
    gainAmmo()
}

function startGame(){    
    area.innerHTML = ""
    area.classList.remove('disabled')

    startBtn.classList.add('button-disabled')

    if(gameRunning, deployingAmmo) {        
        clearInterval(gameRunning)
        clearInterval(deployingAmmo)
    }

    // GAME STARTS
    gameRunning = setInterval(addBall, 650)
    deployingAmmo = setInterval(addAmmo, 3500)   

    area.addEventListener('click', shoot)

}

function stopGame(){
    clearInterval(gameRunning)
    clearInterval(deployingAmmo)

    const balls = document.querySelectorAll(".ball")
    balls.forEach(ball => {
        ball.classList.add('disabled')
    });
    const ammo = document.querySelectorAll(".ammo")
    ammo.forEach(ammo => {
        ammo.classList.add('disabled')
    });
    
    resetBtn.classList.remove('button-disabled')

    area.classList.add('disabled')
    
}

function resetGame(){
    document.location.reload(true)
}
