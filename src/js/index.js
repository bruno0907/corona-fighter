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


const pointsCounter = document.querySelector("#pointsCounter")  

const hpBar = document.querySelector(".hp-bar-fill")
const ammoBar = document.querySelector(".ammo-bar-fill")

const imgdir = "./public/images/"
const sfxdir = "./public/sfx/"

// VARIÁVEIS DE HP
let totalHp = parseFloat(100)
const hpAdd = parseFloat(20)

hpBar.style.height = "100%"

// VARIÁVEIS DE DANO
const covidDmg = parseFloat(3)
const cloroquineDmg = parseFloat(33)
const cloroquineHp = parseFloat(33)

// VARIÁVEIS DE MUNIÇÃO
const maxAmmo = parseFloat(100)
let totalAmmo = maxAmmo

const ammoGain = parseFloat(12)

// VARIÁVEIS DE CUSTO DE TIRO
const bulletCost = parseFloat(2)

ammoBar.style.height = "100%"

pointsCounter.innerHTML = parseFloat(0)

let spawnCovid // INTERVAL ID OF COVIDS
let spawnAmmo // INTERVAL ID OF AMMO
let spawnCloroquine

function gameLoadHandler(){
    window.addEventListener('load', () =>{    
        howTo.classList.remove('hide')

        modal.appendChild(howTo)
        modal.appendChild(startBtn)

        area.classList.add('click-disabled')   

        pauseBtn.classList.add('click-disabled', 'button-greyd')
    })
}
gameLoadHandler()

function sfxPlay(audio) {
    audio = new Audio(audio)  
    audio.play()
}

function addCovid(){  
    const covid = document.createElement("img")  
    covid.setAttribute("src", imgdir + "coronavirus.svg") 
    covid.setAttribute("class", "covid")
    covid.setAttribute("id", "covid")
    let leftPos = Math.floor(Math.random() * 95)
    let topPos = Math.floor(Math.random() * 85)
    covid.setAttribute("style", "left:"+leftPos+"%;top:"+topPos+"%")
    covid.setAttribute("onclick", "popCovid(this)")  
    area.appendChild(covid);
    takeDmg(totalHp, covidDmg)
}

function addCloroquine(){  
    const cloroquine = document.createElement("img")  
    cloroquine.setAttribute("src", imgdir + "cloroquina.svg") 
    cloroquine.setAttribute("class", "covid")
    let leftPos = Math.floor(Math.random() * 95)
    let topPos = Math.floor(Math.random() * 85)
    cloroquine.setAttribute("style", "left:"+leftPos+"%;top:"+topPos+"%")
    cloroquine.setAttribute("onclick", "getCloroquine(this)")  
    area.appendChild(cloroquine);
}

function addAmmo(){   
    const ammo = document.createElement("img") 
    ammo.setAttribute("src", imgdir + "alcool.svg")
    ammo.setAttribute("class", "ammo")
    let leftPos = Math.floor(Math.random() * 95)
    let topPos = Math.floor(Math.random() * 85)
    ammo.setAttribute("style", "left:"+leftPos+"%;top:"+topPos+"%")
    ammo.setAttribute("onclick", "getAmmo(this)")   
    area.appendChild(ammo);
}

function popCovid(el){    
    el.setAttribute("src", imgdir + "corona-splash.svg")
    setTimeout(() => {     
        area.removeChild(el)
        pointsCounter.innerHTML++  
        gainHp(totalHp, hpAdd)  
        sfxPlay(sfxdir + "swipe.mp3")},
    150)
}

function getCloroquine(el){
    area.removeChild(el)
    if( Math.floor(Math.random(100) * 2) == 0 )  {
        gainHp(totalHp, cloroquineHp)
    } else {
        takeDmg(totalHp, cloroquineDmg)
    }
    sfxPlay(sfxdir + "bite.mp3")
}


// LIFE AND DAMAGE EVENTS
function gainHp(a, b){   
    totalHp = a + b
    if (totalHp < 100){ 
        hpBar.style.height = `${totalHp}%`
    } else {
        totalHp = 100
        hpBar.style.height = "100%"
    }

}

function takeDmg(a, b){    
    totalHp = a - b
    hpBar.style.height = `${a - b}%` 
    deathHandle()
    console.log(totalHp)
}

function deathHandle(){
    if (totalHp <= 0){
        hpBar.style.height = `0%`

        modal.classList.remove('hide')

        gameover.classList.remove('hide')
        gameover.innerHTML = "YOU HAVE DIED!!!!!"
        modal.appendChild(gameover)

        playAgainBtn.classList.remove('hide')
        modal.appendChild(playAgainBtn) 

        stopGame() 

        sfxPlay(sfxdir + "gameover.mp3") 
    } 
    
    if (totalAmmo <= 0){
        ammoBar.style.heigh = "0%"

        modal.classList.remove('hide')
        gameover.classList.remove('hide')
        gameover.innerHTML = "YOU RAN OUT OF ALCOHOL!!!!"
        modal.appendChild(gameover)

        playAgainBtn.classList.remove('hide')
        modal.appendChild(playAgainBtn) 

        stopGame() 
        sfxPlay(sfxdir + "gameover.mp3") 
    }
}


// AMMO AND SHOOTING EVENTS
function getAmmo(el){
    area.removeChild(el)
    sfxPlay(sfxdir + "alcool.mp3")
    gainAmmo(totalAmmo, ammoGain)
}


function gainAmmo(a, b){
    totalAmmo = a + b
    if (totalAmmo >= maxAmmo){       
        totalAmmo = maxAmmo + bulletCost 
        ammoBar.style.height = `${totalAmmo}`
    } else {

        ammoBar.style.height = `${totalAmmo}%`


    }
}


area.addEventListener('click', () => {
    totalAmmo = totalAmmo - bulletCost  
        ammoBar.style.height = `${totalAmmo}%`  

        sfxPlay(sfxdir + "spray.mp3") 

        deathHandle()
})


// BUTTONS EVENTS

function startGame(){  

    if(spawnCovid, spawnAmmo, spawnCloroquine) {        
        clearInterval(spawnCovid)
        clearInterval(spawnAmmo)
        clearInterval(spawnCloroquine)      

    }
    spawnCovid = setInterval(addCovid, 850)    
    spawnAmmo = setInterval(addAmmo, 2500)  
    spawnCloroquine = setInterval(addCloroquine, 3250)
}

function stopGame(){
    clearInterval(spawnCovid)
    clearInterval(spawnAmmo)
    clearInterval(spawnCloroquine)

}

function resetGame(){
    document.location.reload(true)
}

function startButton(){
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
}
startButton()


function pauseButton(){
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
}
pauseButton()

function resumeButton(){
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
}
resumeButton()

function quitButton(){
    quitBtn.addEventListener('click', () => { 

        stopGame()

        modal.classList.remove('hide')
        
        popUp.classList.remove('hide')
        modal.appendChild(popUp)
        
        quitBtn.classList.add('click-disabled')
        pauseBtn.classList.add('click-disabled')

    })    
}
quitButton()

function popUpNoButton(){
    popUpNo.addEventListener('click', () => {

        area.classList.remove('click-disabled')

        popUp.classList.add('hide')

        modal.classList.add('hide')

        quitBtn.classList.remove('click-disabled')
        pauseBtn.classList.remove('click-disabled')

        startGame()
    })
}
popUpNoButton()

function resetButtons(){
    playAgainBtn.addEventListener('click', resetGame)
    resetBtn.addEventListener('click', resetGame)
    popUpYes.addEventListener('click', resetGame)
}
resetButtons()

