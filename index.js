const area = document.getElementById("area")

const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")
const ammoCounter = document.getElementById("ammo")

const pointsCounter = document.getElementById("points")  

pointsCounter.value = 0
pointsCounter.innerHTML = pointsCounter.value

ammoCounter.value = 10
ammoCounter.innerHTML = ammoCounter.value

const ammoPack = 5

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
    pointsCounter.value++     
    pointsCounter.innerHTML = pointsCounter.value
}

function getAmmo(el){
    area.removeChild(el)

    let totalAmmo = parseInt(ammoCounter.value)

    ammoCounter.value = totalAmmo + 5
    ammoCounter.innerHTML = totalAmmo
}

stopBtn.disabled = true
resetBtn.disabled = true

startBtn.addEventListener('click', startGame)
stopBtn.addEventListener('click', stopGame)
resetBtn.addEventListener('click', resetGame)

function startGame(){    
    if(gameRunning, deployingAmmo) {        
        clearInterval(gameRunning)
        clearInterval(deployingAmmo)
    }
    gameRunning = setInterval(addBall, 300)
    deployingAmmo = setInterval(addAmmo, 300)

    startBtn.disabled = true
    stopBtn.disabled = false    
    area.classList.remove('disabled')

    area.addEventListener('click', () => {
        if (ammoCounter.value > 0){
            ammoCounter.value--
            ammoCounter.innerHTML = ammoCounter.value
        }
        if (ammoCounter.innerHTML == "0"){
            stopGame()
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
    
    stopBtn.disabled = true
    resetBtn.disabled = false
    area.classList.add('disabled')
    
}

function resetGame(){
        area.innerHTML = ""
        pointsCounter.innerHTML = "0"
        ammoCounter.innerHTML = "10" 

        startBtn.disabled = false
        resetBtn.disabled = true
    }
