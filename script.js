
/*----- CONSTANTS -----*/

const timerDisplayEl = document.querySelector("#timerDisplay")

const currentTimeIntervalEl = document.querySelector("#cyclesDisplay")


/*----- STATE VARIABLES -----*/

let timer = null;
let timer2 = null;
let timer2Value = 10;

let interval = 10000;
let interval2 = 1000;

let alive = 1
// 1 is alive, zero is dead

let isRfNotZeroK = true
let isRfNotZeroPhos = true

let metabolicPhenotype = 1

let respiratoryPhenotype = 1

let hemodynamicPhenotype = 1

let globalReplacementFluidRateValue 

let currentLabValues = {
    potassium: 7.2,
    bicarb: 20,
    phos: 3.1
}


let roundedCurrentLabValues = {
    potassium: [],
    bicarb: [],
    phos: []
}


//to do ### for let to round this^ ?


let allLabValues = {
    potassium: [],
    bicarb: [],
    phos: []
}

let clearanceValues = {
    potassium: 0,
    bicarb: 0,
    phos: 0
}


/*----- CACHED ELEMENTS  -----*/

const potassiumEl = document.querySelector('.potassium')
const bicarbEl  = document.querySelector('.bicarb')


const potassiumEl1 = document.querySelector('.potassium1')
const potassiumEl2 = document.querySelector('.potassium2')
const potassiumEl3 = document.querySelector('.potassium3')
const potassiumEl4 = document.querySelector('.potassium4')
const potassiumEl5 = document.querySelector('.potassium5')
const potassiumEl6 = document.querySelector('.potassium6')

const phosEl1 = document.querySelector('.phos1')
const phosEl2 = document.querySelector('.phos2')
const phosEl3 = document.querySelector('.phos3')
const phosEl4 = document.querySelector('.phos4')
const phosEl5 = document.querySelector('.phos5')
const phosEl6 = document.querySelector('.phos6')

let replacementFluidRateValue

const startBtnEl = document.querySelector('.start')
const updateOrderBtnEl = document.querySelector('.update-order-button')

const disappearingRadioButtonsContainerEl = document.querySelector(".disappearing-container-radio-buttons")

const btnPrismasol0kEl = document.querySelector(".button-Prismasol-0K")
const btnPrismasol4kEl = document.querySelector(".button-Prismasol-4K")
const btnPhoxillumEl = document.querySelector(".button-Phoxillum")

const btnBeginModal = document.querySelector(".button-begin-modal")
const beginModal = document.querySelector(".modal-start-page")

const btnRefreshPage = document.querySelector(".button-refresh-page")
const gameOverModal = document.querySelector(".modal-game-over")

const gameOverFeedback = document.querySelector("#feedback")

const instructionsEl = document.querySelector(".modal-instructions")
const btnCloseInstructions = document.querySelector(".button-close-instructions-modal")
const btnOpenInstructions = document.querySelector(".open-instructions")

let ultrafiltrationRateEl = document.getElementById("myUfRange")
let convertedUltrafiltrationRate
let sliderUfRate = document.querySelector(".slider-ultrafiltration-rate")

/*----- EVENT LISTENERS -----*/

startBtnEl.addEventListener('click', handleStartClick)
updateOrderBtnEl.addEventListener('click', updateRFRValue)

btnPrismasol0kEl.addEventListener('click', initiatePrismasol0k)
btnPrismasol4kEl.addEventListener('click', initiatePrismasol4k)
btnPhoxillumEl.addEventListener('click', initiatePhoxillum)

btnBeginModal.addEventListener('click', closeBeginModal)
btnRefreshPage.addEventListener('click', refreshPage)

btnCloseInstructions.addEventListener('click', closeInstructions)
btnOpenInstructions.addEventListener('click', openInstructions)

ultrafiltrationRateEl.oninput = function() {
    convertedUltrafiltrationRate = this.value*10;
    sliderUfRate.innerHTML = `Ultrafiltration Rate: ${convertedUltrafiltrationRate}`
}

/*----- FUNCTIONS -----*/

function closeBeginModal() {
    beginModal.style.display = "none";
}

function closeInstructions() {
    instructionsEl.style.display = "none";
}

function openInstructions() {
    instructionsEl.style.display = "block";
}

function handleStartClick() {
    init()
    startBtnEl.setAttribute("disabled", "true");
}


function init() {

    // interval = 6000 // one minute is a cycle ### To do: make timer animation
    timer = setInterval(continueGame, interval)
    timer2 = setInterval(decrementCount, interval2)
        // mirrored the function we used in the Tamagotchi game
    cycles = 0 // starts at zero

    render()
    // continueGame() - don't need this another time in init() function
}


function render() {
    roundPotassium()
    roundPhos()
    appendNewLabValues()
    renderAllLabValues()
}


function appendNewLabValues() {
    for (let key in allLabValues) {
        allLabValues[key].push((`${roundedCurrentLabValues[key]}`))
        // console.log(`${allLabValues[key]}`)
        }   
}

function renderAllLabValues() {

    if (cycles === 0) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        currentTimeIntervalEl.innerHTML = `0hr`
        phosEl1.innerHTML = `${allLabValues.phos[0]}`
    } else if (cycles === 1) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        currentTimeIntervalEl.innerHTML = `4hr`
        phosEl1.innerHTML = `${allLabValues.phos[0]}`
        phosEl2.innerHTML = `${allLabValues.phos[1]}`
    } else if (cycles === 2) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
        currentTimeIntervalEl.innerHTML = `8hr`
        phosEl1.innerHTML = `${allLabValues.phos[0]}`
        phosEl2.innerHTML = `${allLabValues.phos[1]}`
        phosEl3.innerHTML = `${allLabValues.phos[2]}`
    } else if (cycles === 3) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
        potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
        currentTimeIntervalEl.innerHTML = `12hr`
        phosEl1.innerHTML = `${allLabValues.phos[0]}`
        phosEl2.innerHTML = `${allLabValues.phos[1]}`
        phosEl3.innerHTML = `${allLabValues.phos[2]}`
        phosEl4.innerHTML = `${allLabValues.phos[3]}`
    } else if (cycles === 4) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
        potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
        potassiumEl5.innerHTML = `${allLabValues.potassium[4]}`
        currentTimeIntervalEl.innerHTML = `16hr`
        phosEl1.innerHTML = `${allLabValues.phos[0]}`
        phosEl2.innerHTML = `${allLabValues.phos[1]}`
        phosEl3.innerHTML = `${allLabValues.phos[2]}`
        phosEl4.innerHTML = `${allLabValues.phos[3]}`
        phosEl5.innerHTML = `${allLabValues.phos[4]}`
    } else if (cycles === 5) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
        potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
        potassiumEl5.innerHTML = `${allLabValues.potassium[4]}`
        potassiumEl6.innerHTML = `${allLabValues.potassium[5]}`
        currentTimeIntervalEl.innerHTML = `20hr`
        phosEl1.innerHTML = `${allLabValues.phos[0]}`
        phosEl2.innerHTML = `${allLabValues.phos[1]}`
        phosEl3.innerHTML = `${allLabValues.phos[2]}`
        phosEl4.innerHTML = `${allLabValues.phos[3]}`
        phosEl5.innerHTML = `${allLabValues.phos[4]}`
        phosEl6.innerHTML = `${allLabValues.phos[5]}`
    } // perhaps if made this an object could use iterative process to make drier
}


function decrementCount() {
    if(timer2Value>0) {
        timer2Value --;
     renderClock(); 
    } else {
        // clearInterval(timer2) // this would make it stop running
        // resetClock()
    }
}

function renderClock() {
    timerDisplayEl.textContent = timer2Value;
}

function resetClock() {
    setTimeout(()=>{
        timer2Value = 8
        timer2 = null
        renderClock();
    }, 1000)
}

function continueGame(){
    // mirrored the function we used in the Tamagotchi game
    let lastCycle = cycles
    cycles++ //so game cycles increase with each 'runGame'
    console.log(`Current Cycle: ${cycles}`)

    if (lastCycle < cycles) {
    // nextInterval()
    goToNextOrEndGame()
    resetClock()
    console.log(lastCycle)
    }
}

function goToNextOrEndGame() {
    if (cycles <= 5) {
        nextInterval()
    } else { gameOver()}
}

function nextInterval() {
    // either time or button event triggers next interval
    if (alive == 1) {
    potassiumClearanceValueModulation()
    toxinAccumulation()
    toxinClearance()
    console.log("Next Interval")
    metabolicPhenotypeValues()
    respiratoryPhenotypeValues()
    console.log("metabolic phenotype: " + metabolicPhenotype)
    console.log("current potassium: " + roundedCurrentLabValues.potassium)
    console.log("current phos: " + roundedCurrentLabValues.phos)
    aliveOrDead()
    console.log("alive: " + alive)
    render()
    } else if (alive == 0) {
        gameOver()
    }
}


function gameOver() {

    gameOverModal.style.display = "block";

  if (alive == 1) {
    gameOverFeedback.innerHTML = "Patient Survived!"
  } else if (metabolicPhenotype == 3 && roundedCurrentLabValues.potassium <= 2.5) {
    gameOverFeedback.innerHTML = "The patient died of hypokalemia. Be highly cautious when using a 0K replacement fluid"
  } else if (metabolicPhenotype == 3 && roundedCurrentLabValues.potassium >= 7.5) {
    gameOverFeedback.innerHTML = "The patient died of hyperkalemia. A 0K replacement fluid and/or higher replacement fluid rate may have been better optimized"
  } else if (respiratoryPhenotype == 3 && roundedCurrentLabValues.phos < 1.5) {
    gameOverFeedback.innerHTML = "The patient died of hypophosphatemia. Be cautious when using a 0Phos replacement fluid"}
}

function refreshPage() {
    location.reload()
}

function toxinAccumulation() {
    currentLabValues.potassium += 1
    currentLabValues.bicarb -= 4
    currentLabValues.phos += 0.5
}

function toxinClearance() {
    runPotassiumClearance()
    runPhosClearance()
    bicarbClearance()
}

function roundPotassium() {
    roundedCurrentLabValues.potassium = currentLabValues.potassium.toFixed(1)
} // we only want this in the rendering output, not under the hood

function roundPhos() {
    roundedCurrentLabValues.phos = currentLabValues.phos.toFixed(1)
} // we only want this in the rendering output, not under the hood


function runPotassiumClearance() {
    if (allLabValues.potassium[allLabValues.potassium.length - 1] < 4.5 && isRfNotZeroK) { return
    } else { potassiumClearance() }
}



function potassiumClearance() {
    if (clearanceValues.potassium == 1) {
        currentLabValues.potassium -= 1.5
    } else if (clearanceValues.potassium == 2) {
        currentLabValues.potassium -= 2
    }  else if (clearanceValues.potassium == 3) {
        currentLabValues.potassium -= 2.5}
}


function potassiumClearanceValueModulation() {

    if (globalReplacementFluidRateValue == 0) {
        clearanceValues.potassium = 0
        clearanceValues.phos = 0
    } else if (globalReplacementFluidRateValue == 1600) {
        clearanceValues.potassium = 1
        clearanceValues.phos = 1
    } else if (globalReplacementFluidRateValue == 2400) {
        clearanceValues.potassium = 2
        clearanceValues.phos = 2
    } else if (globalReplacementFluidRateValue == 3200) {
        clearanceValues.potassium = 3
        clearanceValues.phos = 3}
} 

function bicarbClearance() {
    // this will be run after user clicks "sign orders" button
       if (currentLabValues.bicarb < 24 && clearanceValues.bicarb === 1) {
        clearanceValues.bicarb += 4
       } else if (currentLabValues.bicarb < 24 && clearanceValues.bicarb === 2) {
        clearanceValues.bicarb += 8
       }
}


function runPhosClearance() {
    if (allLabValues.phos[allLabValues.phos.length - 1] < 4.1 && isRfNotZeroPhos) { return
    } else { phosClearance() }
}

function phosClearance() {
    // ### need to write this out too
    // console.log("phos clearance function running")

    if (clearanceValues.phos == 1) {
        currentLabValues.phos -= 0.4
    } else if (clearanceValues.phos == 2) {
        currentLabValues.phos -= 0.9
    }  else if (clearanceValues.phos == 3) {
        currentLabValues.phos -= 1.3}
    }



function updateRFRValue() {
  // SRC: https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
    document.getElementById("replacement-fluid-rate").innerHTML = "";
    let el = document.getElementsByTagName('input');
    for (i = 0; i < el.length; i++) {
        if (el[i].checked) {
            replacementFluidRateValue = el[i].value
            globalReplacementFluidRateValue = replacementFluidRateValue
            // console.log(replacementFluidRateValue)
            document.getElementById("replacement-fluid-rate").innerHTML = `Replacement Fluid Rate: ${replacementFluidRateValue}`
        }
    } 
}

function initiatePrismasol0k () {
    updateOrderBtnEl.style.visibility = "visible";
    disappearingRadioButtonsContainerEl.style.visibility = "visible";
    isRfNotZeroK = false;
    isRfNotZeroPhos = false;
    // console.log("prismasol0k")
    btnPrismasol0kEl.setAttribute("disabled", "true");
    btnPrismasol4kEl.removeAttribute("disabled", "true");
    btnPrismasol4kEl.setAttribute("enabled", "true");
    btnPhoxillumEl.removeAttribute("disabled", "true");
    btnPhoxillumEl.setAttribute("enabled", "true");
    // need to add effect of into K/Phos handling functions
}

function initiatePrismasol4k () {
    updateOrderBtnEl.style.visibility = "visible";
    disappearingRadioButtonsContainerEl.style.visibility = "visible";
    isRfNotZeroK = true;
    isRfNotZeroPhos = false;
    // console.log("prismasol4k")
    btnPrismasol0kEl.removeAttribute("disabled", "true");
    btnPrismasol0kEl.setAttribute("enabled", "true");
    btnPrismasol4kEl.setAttribute("disabled", "true");
    btnPhoxillumEl.removeAttribute("disabled", "true");
    btnPhoxillumEl.setAttribute("enabled", "true");
    // need to add effect of into K/Phos handling functions
}

function initiatePhoxillum () {
    updateOrderBtnEl.style.visibility = "visible";
    disappearingRadioButtonsContainerEl.style.visibility = "visible";
    isRfNotZeroK = true;
    isRfNotZeroPhos = true;
    // console.log("phoxillum")
    btnPrismasol0kEl.removeAttribute("disabled", "true");
    btnPrismasol0kEl.setAttribute("enabled", "true");
    btnPrismasol4kEl.removeAttribute("disabled", "true");
    btnPrismasol4kEl.setAttribute("enabled", "true");
    btnPhoxillumEl.setAttribute("disabled", "true");
    // need to add effect of into K/Phos handling functions

}


function aliveOrDead() {
    if (metabolicPhenotype <3 && hemodynamicPhenotype <3 && respiratoryPhenotype <3) {
    alive = 1
    } else {alive = 0}
} 

function metabolicPhenotypeValues() {
    if (roundedCurrentLabValues.potassium <= 2.5) {
        metabolicPhenotype = 3
    } else if (roundedCurrentLabValues.potassium >= 7.5) {
        metabolicPhenotype = 3
    } else if (roundedCurrentLabValues.potassium >= 6.5) {
        metabolicPhenotype = 2
    } else {metabolicPhenotype = 1}
} 

function respiratoryPhenotypeValues() {
    if (roundedCurrentLabValues.phos < 1.5) {
        respiratoryPhenotype = 3
    } 
}