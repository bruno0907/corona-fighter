const area = document.getElementById("area")

const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")

const ammoCounter = document.getElementById("ammoCounter")
const pointsCounter = document.getElementById("pointsCounter")  
const hp = document.getElementById("hp")

const gameover = "<h1 class=gameover>GAME OVER</h1>" 
const howTo = "<h1 style=color:red>Clique nos coroninhas para ganhar pontos e vida</h1><h1>E</h1><h1 style=color:#3e7394>nos frascos de alcool em gel para reabaster</h1>"

pointsCounter.innerHTML = parseFloat(0)
ammoCounter.innerHTML = parseFloat(10)
hp.innerHTML = parseFloat(15)

let gameRunning // INTERVAL ID OF BALLS
let deployingAmmo // INTERVAL ID OF AMMO

startBtn.addEventListener('click', startGame)
//stopBtn.addEventListener('click', stopGame)
resetBtn.addEventListener('click', resetGame)



function loadingHandle(){
    area.innerHTML = howTo
    area.classList.add('disabled')
    //stopBtn.classList.add('btn-disabled')
    resetBtn.classList.add('btn-disabled')
}
loadingHandle()

function takeDmg(){ 
    hp.innerHTML--    
    if (hp.innerHTML == parseFloat(0)){
        stopGame()
        area.innerHTML = gameover        
    }
}

function gainHp(){  
    return hp.innerHTML++
}

function gainAmmo(){
    let totalAmmo = parseFloat(ammoCounter.innerHTML) 
    ammoCounter.innerHTML = totalAmmo + parseFloat(6);
}

function shoot(){    
    if (ammoCounter.innerHTML > parseFloat(0)){
        ammoCounter.innerHTML--
    }
    if (ammoCounter.innerHTML == parseFloat(0)){
        stopGame()   
        area.innerHTML = gameover        
    }    
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
    area.removeChild(el)    
    pointsCounter.innerHTML++   
    gainHp()  
}

function getAmmo(el){
    area.removeChild(el)
    gainAmmo()
}

function startGame(){    
    area.innerHTML = ""
    area.classList.remove('disabled')

    startBtn.classList.add('btn-disabled')
    //stopBtn.classList.remove('btn-disabled') 

    if(gameRunning, deployingAmmo) {        
        clearInterval(gameRunning)
        clearInterval(deployingAmmo)
    }

    // GAME STARTS
    gameRunning = setInterval(addBall, 750)
    deployingAmmo = setInterval(addAmmo, 2500)   

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
    
    //stopBtn.classList.add('btn-disabled')
    resetBtn.classList.remove('btn-disabled')

    area.classList.add('disabled')
    
}

function resetGame(){

    area.innerHTML = howTo
    area.classList.add('disabled')

    startBtn.classList.remove('btn-disabled')
    //stopBtn.classList.add('btn-disabled')
    resetBtn.classList.add('btn-disabled')

    pointsCounter.innerHTML = parseFloat(0)
    ammoCounter.innerHTML = parseFloat(10)
    hp.innerHTML = parseFloat(15)    
}
