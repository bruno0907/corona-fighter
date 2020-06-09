const area = document.getElementById("area")

const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")

const ammoCounter = document.getElementById("ammoCounter")
const pointsCounter = document.getElementById("pointsCounter")  
const hp = document.getElementById("hp")

const gameover = document.querySelector(".gameover")

pointsCounter.innerHTML = parseFloat(0)
ammoCounter.innerHTML = parseFloat(10)
hp.innerHTML = parseFloat(15)

let gameRunning // INTERVAL ID OF BALLS
let deployingAmmo // INTERVAL ID OF AMMO

startBtn.addEventListener('click', startGame)
stopBtn.addEventListener('click', stopGame)
resetBtn.addEventListener('click', resetGame)

area.addEventListener('click', handleAmmo)

function loadingHandle(){
    area.classList.add('disabled')
    stopBtn.classList.add('btn-disabled')
    resetBtn.classList.add('btn-disabled')
}
loadingHandle()

function takeDmg(){  
    return hp.innerHTML--
}

function gainHp(){  
    return hp.innerHTML++
}

function handleAmmo(){
    if (ammoCounter.innerHTML > parseFloat(0)){
        ammoCounter.innerHTML--
    }
    if (ammoCounter.innerHTML == parseFloat(0)){
        stopGame()                        
        gameover.classList.add('show-gameover')
    }
}

function addBall(){     
    const ball = document.createElement("div")   
    ball.setAttribute("class", "ball")
    var leftPos = Math.floor(Math.random() * 500)
    var topPos = Math.floor(Math.random() * 400)
    ball.setAttribute("style", "left:"+leftPos+"px;top:"+topPos+"px")
    ball.setAttribute("onclick", "popBall(this)")  
    area.appendChild(ball);    
    takeDmg()
    if (hp.innerHTML == parseFloat(0)){
        stopGame()
        gameover.classList.add('show-gameover')
        return
    }
}

function addAmmo(){       
    const ammo = document.createElement("div") 
    ammo.setAttribute("class", "ammo")
    var leftPos = Math.floor(Math.random() * 500)
    var topPos = Math.floor(Math.random() * 400)
    ammo.setAttribute("style", "left:"+leftPos+"px;top:"+topPos+"px")
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
    let totalAmmo = parseFloat(ammoCounter.innerHTML) 
    ammoCounter.innerHTML = totalAmmo + parseFloat(6);
}

function startGame(){    

    area.classList.remove('disabled')

    startBtn.classList.add('btn-disabled')
    stopBtn.classList.remove('btn-disabled') 

    if(gameRunning, deployingAmmo) {        
        clearInterval(gameRunning)
        clearInterval(deployingAmmo)
    }

    // GAME STARTS
    gameRunning = setInterval(addBall, 750)
    deployingAmmo = setInterval(addAmmo, 2500)   

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
    
    stopBtn.classList.add('btn-disabled')
    resetBtn.classList.remove('btn-disabled')

    area.classList.add('disabled')
    
}

function resetGame(){
    gameover.classList.remove('show-gameover')

    area.innerHTML = ""
    area.classList.add('disabled')

    startBtn.classList.remove('btn-disabled')
    resetBtn.classList.add('btn-disabled')

    pointsCounter.innerHTML = parseFloat(0)
    ammoCounter.innerHTML = parseFloat(10)
    hp.innerHTML = parseFloat(15)    
}
