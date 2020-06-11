const body = document.querySelector('body')

window.addEventListener('load', function() {
    body.setAttribute("style", "opacity: 1")
})

const area = document.getElementById("area")

const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")


const hpCounter = document.getElementById("hpCounter")
const ammoCounter = document.getElementById("ammoCounter")
const pointsCounter = document.getElementById("pointsCounter")  


let totalHp = 100
const dmgValue = 5
let hpAdd = 10

const hpBar = document.querySelector(".hp-bar-fill")
hpBar.style.height = "100%"
hpCounter.innerHTML = hpBar.style.height


let totalAmmo = 100
const bulletCost = 5
let bulletAdd = 10

const ammoBar = document.querySelector(".ammo-bar-fill")
ammoBar.style.height = "100%"
ammoCounter.innerHTML = ammoBar.style.height


const gameover = "<h1 class=gameover>YOU HAVE DIED !!!!</h1>" 
const howTo = "<h1 style=color:red>Clique nos coroninhas para ganhar pontos e vida</h1><h1>E</h1><h1 style=color:#3e7394>nos frascos de alcool em gel para reabaster</h1>"


pointsCounter.innerHTML = parseFloat(0)


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

function addBall(){  
    const ball = document.createElement("img")  
    ball.setAttribute("src", "coronavirus.svg") 
    ball.setAttribute("class", "ball")
    let leftPos = Math.floor(Math.random() * 95)
    let topPos = Math.floor(Math.random() * 85)
    ball.setAttribute("style", "left:"+leftPos+"%;top:"+topPos+"%")
    ball.setAttribute("onclick", "popBall(this)")  
    area.appendChild(ball);
    takeDmg(totalHp, dmgValue)
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
    gainHp(totalHp, hpAdd)  
    sfxPlay("fart.mp3")}, 150)
}

function getAmmo(el){
    area.removeChild(el)
    gainAmmo(totalAmmo, bulletAdd)
}

function takeDmg(a, b){    
    hpBar.style.height = `${a - b}%`   
    hpCounter.innerHTML = hpBar.style.height

    if (totalHp == 0){
        stopGame()
        area.innerHTML = gameover
        sfxPlay("gameover.mp3")
    }
    return totalHp = a - b
}

function fire(a, b){  
    if (totalAmmo > 0){
        ammoBar.style.height = `${a - b}%`   
        ammoCounter.innerHTML = ammoBar.style.height

        sfxPlay("spray.mp3") 
        return totalAmmo = a - b
        
    } else {
        area.innerHTML = gameover   
        sfxPlay("gameover.mp3")
        stopGame() 
    }
}

function gainHp(a, b){     
    if (totalHp < 99){
        hpBar.style.height = `${a + b}%`   
        hpCounter.innerHTML = hpBar.style.height
        totalHp = a + b 
    } 
}

function gainAmmo(a, b){
    if (totalAmmo < 99){
        ammoBar.style.height = `${a + b}%`   
        ammoCounter.innerHTML = ammoBar.style.height    
        sfxPlay("alcool.mp3")
        totalAmmo = a + b
    }
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

    area.addEventListener('click', () => {
        fire(totalAmmo, bulletCost)
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
    
    resetBtn.classList.remove('button-disabled')

    area.classList.add('disabled')
    
}

function resetGame(){
    document.location.reload(true)
}
