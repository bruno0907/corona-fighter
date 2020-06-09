const area = document.getElementById("area")

const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")

const ammoCounter = document.getElementById("ammoCounter")
const pointsCounter = document.getElementById("pointsCounter")  
const hp = document.getElementById("hp")

const gameover = document.querySelector(".gameover")

pointsCounter.innerHTML = 0
ammoCounter.innerHTML = 10
hp.innerHTML = 10

life = parseFloat(hp.innerHTML) 

function lifeDmg(){  

    return hp.innerHTML = life--     
        
}
//setInterval(lifeDmg, 1500)


stopBtn.classList.add('btn-disabled')
resetBtn.classList.add('btn-disabled')

let gameRunning // INTERVAL ID OF BALLS
let deployingAmmo // INTERVAL ID OF AMMO

function addBall(){     
    const ball = document.createElement("div")   
    ball.setAttribute("class", "ball")
    var leftPos = Math.floor(Math.random() * 500)
    var topPos = Math.floor(Math.random() * 400)
    ball.setAttribute("style", "left:"+leftPos+"px;top:"+topPos+"px")
    ball.setAttribute("onclick", "popBall(this)")  
    area.appendChild(ball);    

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
}

function getAmmo(el){
    area.removeChild(el)
    let totalAmmo = parseFloat(ammoCounter.innerHTML) 
    ammoCounter.innerHTML = totalAmmo + 6;
}

startBtn.addEventListener('click', startGame)
stopBtn.addEventListener('click', stopGame)
resetBtn.addEventListener('click', resetGame)

function startGame(){    
    if(gameRunning, deployingAmmo) {        
        clearInterval(gameRunning)
        clearInterval(deployingAmmo)
    }

    // GAME STARTS
    gameRunning = setInterval(addBall, 1000)
    deployingAmmo = setInterval(addAmmo, 5000)

    startBtn.classList.add('btn-disabled')
    stopBtn.classList.remove('btn-disabled') 

    area.classList.remove('disabled')

    area.addEventListener('click', () => {
        if (ammoCounter.innerHTML > 0){
            ammoCounter.innerHTML--
        }
        if (ammoCounter.innerHTML == "0"){
            stopGame()            
            gameover.classList.add('show-gameover')
            console.log('Vc perdeu!!!!')
            return
        }
    })
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
        pointsCounter.innerHTML = "0"
        ammoCounter.innerHTML = "10" 

        startBtn.classList.remove('btn-disabled')
        resetBtn.classList.add('btn-disabled')
    }
