// VARIÁVEIS DE ELEMENTOS DE AREA
const container = document.querySelector('#container')
const area = document.querySelector("#area")
const modal = document.querySelector("#modal")

const popUp = document.querySelector('.popUp')
const popUpYes = document.querySelector('#popUpYes')
const popUpNo = document.querySelector('#popUpNo')

const gameover = document.querySelector(".gameover") 
const howTo = document.querySelector("#howTo")
const paused = document.querySelector("#paused")

const startBtn = document.querySelector("#start")
const resetBtn = document.querySelector("#reset")
const resumeBtn = document.querySelector("#resume")
const playAgainBtn = document.querySelector("#playAgain")

const pauseBtn = document.querySelector("#pause")
const quitBtn = document.querySelector("#quit")

const hpCounter = document.querySelector("#hpCounter")
const ammoCounter = document.querySelector("#ammoCounter")
const pointsCounter = document.querySelector("#pointsCounter")  

const hpBar = document.querySelector(".hp-bar-fill")
const ammoBar = document.querySelector(".ammo-bar-fill")

// VARIÁVEIS DE HP
let totalHp = 100
let hpAdd = 10

hpBar.style.height = "100%"
hpCounter.innerHTML = hpBar.style.height

// VARIÁVEIS DE DANO
const covidDmg = 5


// VARIÁVEIS DE MUNIÇÃO
let totalAmmo = 100
let bulletAdd = 15

// VARIÁVEIS DE CUSTO DE TIRO
const bulletCost = 5

ammoBar.style.height = "100%"
ammoCounter.innerHTML = ammoBar.style.height

pointsCounter.innerHTML = 0

let spawnCovid // INTERVAL ID OF COVIDS
let spawnAmmo // INTERVAL ID OF AMMO
let spawnCloroquine

// FUNÇÕES DE GAMEPLAY E COMANDOS
function loadingHandle(){    
    howTo.classList.remove('hide')
    modal.appendChild(howTo)
    modal.appendChild(startBtn)

    area.classList.add('click-disabled')   

    pauseBtn.classList.add('click-disabled', 'button-greyd')
}
loadingHandle()

function sfxPlay(audio) {
    audio = new Audio(audio)  
    audio.play()
}

function addCovid(){  
    const covid = document.createElement("img")  
    covid.setAttribute("src", "coronavirus.svg") 
    covid.setAttribute("class", "covid")
    let leftPos = Math.floor(Math.random() * 95)
    let topPos = Math.floor(Math.random() * 85)
    covid.setAttribute("style", "left:"+leftPos+"%;top:"+topPos+"%")
    covid.setAttribute("onclick", "popCovid(this)")  
    area.appendChild(covid);
    takeDmg(totalHp, 10)
}
function addCloroquine(){  
    const cloroquine = document.createElement("img")  
    cloroquine.setAttribute("src", "cloroquina.svg") 
    cloroquine.setAttribute("class", "covid")
    let leftPos = Math.floor(Math.random() * 95)
    let topPos = Math.floor(Math.random() * 85)
    cloroquine.setAttribute("style", "left:"+leftPos+"%;top:"+topPos+"%")
    cloroquine.setAttribute("onclick", "getCloroquine(this)")  
    area.appendChild(cloroquine);

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

function popCovid(el){    
    el.setAttribute("src", "corona-splash.svg")
    setTimeout(() => {     
    area.removeChild(el)
    pointsCounter.innerHTML++  
    gainHp(totalHp, 10)  
    sfxPlay("swipe.mp3")}, 150)
}

function getAmmo(el){
    area.removeChild(el)
    gainAmmo(totalAmmo, 15)
}

function getCloroquine(el){
    area.removeChild(el)
    if( Math.floor(Math.random(100) * 100) >= 50 )  {
        gainHp(totalHp, 25)
    } else {
        takeDmg(totalHp, 30)
    }
    sfxPlay("bite.mp3")
}

function takeDmg(a, b){    
    hpBar.style.height = `${a - b}%`   
    hpCounter.innerHTML = hpBar.style.height       
        
    if (totalHp <= 0){
        hpBar.style.height = `0%`
        hpCounter.innerHTML = hpBar.style.height

        modal.classList.remove('hide')

        gameover.classList.remove('hide')
        gameover.innerHTML = "YOU HAVE DIED!!!!!"
        modal.appendChild(gameover)

        playAgainBtn.classList.remove('hide')
        modal.appendChild(playAgainBtn) 

        stopGame()
        
        sfxPlay("gameover.mp3")
    }    
    return totalHp = a - b 
}

function shoot(a, b){  
    if (totalAmmo <= 0){
        ammoBar.style.height = `0%`
        ammoCounter.innerHTML = 0

        modal.classList.remove('hide')

        gameover.classList.remove('hide')
        gameover.innerHTML = "YOU RAN OUT OF ALCOHOL!!!!"
        modal.appendChild(gameover)

        playAgainBtn.classList.remove('hide')
        modal.appendChild(playAgainBtn) 

        stopGame() 

        sfxPlay("gameover.mp3")    
    } 
    ammoBar.style.height = `${a - b}%`   
    ammoCounter.innerHTML = ammoBar.style.height

    sfxPlay("spray.mp3") 
    return totalAmmo = a - b    
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

    if(spawnCovid, spawnAmmo) {        
        clearInterval(spawnCovid)
        clearInterval(spawnAmmo)
        clearInterval(spawnCloroquine)
    }
    spawnCovid = setInterval(addCovid, 650)    
    spawnAmmo = setInterval(addAmmo, 2850)  
    spawnCloroquine = setInterval(addCloroquine, 4250)

    const covids = document.querySelectorAll(".covid")
    covids.forEach(covid => {
        covid.classList.remove('click-disabled')
    });

    const ammo = document.querySelectorAll(".ammo")
    ammo.forEach(ammo => {
        ammo.classList.remove('click-disabled')
    });

}

function stopGame(){
    clearInterval(spawnCovid)
    clearInterval(spawnAmmo)
    clearInterval(spawnCloroquine)

    const covids = document.querySelectorAll(".covid")
    covids.forEach(covid => {
        covid.classList.add('click-disabled')
    });
    const ammo = document.querySelectorAll(".ammo")
    ammo.forEach(ammo => {
        ammo.classList.add('click-disabled')
    });
}

function resetGame(){
    document.location.reload(true)
}


// BUTTONS EVENTS
startBtn.addEventListener('click', () => {
    
    modal.classList.add('hide')
    howTo.classList.add('hide')    

    modal.innerHTML = ""

    area.innerHTML = ""

    area.classList.remove('click-disabled')

    pauseBtn.classList.remove('click-disabled', 'button-greyd')

    startBtn.classList.add('hide')

    startGame()

})

pauseBtn.addEventListener('click', () => {

    stopGame()

    modal.classList.remove('hide')

    paused.classList.remove('hide')
    modal.appendChild(paused)

    resumeBtn.classList.remove('hide')
    modal.appendChild(resumeBtn)

    resetBtn.classList.remove('hide')
    modal.appendChild(resetBtn)
    

    area.classList.add('click-disabled')        
    pauseBtn.classList.add('click-disabled')
    
})

resumeBtn.addEventListener('click', () => {    

    area.classList.remove('click-disabled')

    resumeBtn.classList.add('hide')
    resetBtn.classList.add('hide')
    pauseBtn.classList.remove('click-disabled')

    modal.classList.add('hide')
    paused.classList.add('hide')

    modal.innerHTML = ""

    startGame()

})

quitBtn.addEventListener('click', () => { 

    stopGame()

    modal.classList.remove('hide')
    
    popUp.classList.remove('hide')
    modal.appendChild(popUp)
    
    quitBtn.classList.add('click-disabled')
    pauseBtn.classList.add('click-disabled')

})

popUpNo.addEventListener('click', () => {

    area.classList.remove('click-disabled')

    popUp.classList.add('hide')

    modal.classList.add('hide')

    quitBtn.classList.remove('click-disabled')
    pauseBtn.classList.remove('click-disabled')

    startGame()

})

playAgainBtn.addEventListener('click', resetGame)

resetBtn.addEventListener('click', resetGame)

popUpYes.addEventListener('click', resetGame)

// CLICK EVENTS
area.addEventListener('click', () => {
    shoot(totalAmmo, bulletCost)
})
