


/*----- CONSTANTS -----*/




/*----- STATE VARIABLES -----*/

let alive = 1
// 1 is alive, zero is dead

let metabolicPhenotype = 1

let respiratoryPhenotype = 1

let hemodynamicPhenotype = 1

let globalReplacementFluidRateValue 

let currentLabValues = {
    potassium: 7.2,
    bicarb: 20
}


let roundedCurrentLabValues = {
    potassium: [],
    bicarb: []
}


//to do ### for let to round this^ ?


let allLabValues = {
    potassium: [],
    bicarb: []
}

let clearanceValues = {
    potassium: 0,
    bicarb: 0
}

// let potassiumClearanceValue = 0
// // will later model this accurately; for now, will score 1-3 based on Rx
// // for now, will just set 4 as lower limit (or zero, if zeroK)

// let bicarbClearanceValue = 0
// // will later model this accurately; for now, will score 1-3 based on Rx



/*----- CACHED ELEMENTS  -----*/

const potassiumEl = document.querySelector('.potassium')
const bicarbEl  = document.querySelector('.bicarb')


const potassiumEl1 = document.querySelector('.potassium1')
const potassiumEl2 = document.querySelector('.potassium2')
const potassiumEl3 = document.querySelector('.potassium3')
const potassiumEl4 = document.querySelector('.potassium4')
const potassiumEl5 = document.querySelector('.potassium5')
const potassiumEl6 = document.querySelector('.potassium6')

let replacementFluidRateValue

const startBtnEl = document.querySelector('.start')
const updateOrderBtnEl = document.querySelector('.update-order-button')


/*----- EVENT LISTENERS -----*/

startBtnEl.addEventListener('click', handleStartClick)
updateOrderBtnEl.addEventListener('click', updateRFRValue)

/*----- FUNCTIONS -----*/

function handleStartClick() {
    init()
    document.querySelector('.start').style.display="none"
}

function init() {

    interval = 3000 // one minute is a cycle ### To do: make timer animation
    timer = setInterval(continueGame, interval)
        // mirrored the function we used in the Tamagotchi game
    cycles = 0 // starts at zero

    render()
    // continueGame() - don't need this another time in init() function
}


function render() {
    roundPotassium()
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

        // potassiumEl.innerHTML = `&nbsp;${allLabValues.potassium}`
        // bicarbEl.innerHTML = `${allLabValues.bicarb}`

    if (cycles === 0) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
    } else if (cycles === 1) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
    } else if (cycles === 2) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
    } else if (cycles === 3) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
        potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
    } else if (cycles === 4) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
        potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
        potassiumEl5.innerHTML = `${allLabValues.potassium[4]}`
    } else if (cycles === 5) {
        potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
        potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
        potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
        potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
        potassiumEl5.innerHTML = `${allLabValues.potassium[4]}`
        potassiumEl6.innerHTML = `${allLabValues.potassium[5]}`
    } // perhaps if made this an object could use iterative process to make drier
}


function continueGame(){
    // mirrored the function we used in the Tamagotchi game
    let lastCycle = cycles
    cycles++ //so game cycles increase with each 'runGame'
    console.log(`Current Cycle: ${cycles}`)

    if (lastCycle < cycles) {
    // nextInterval()
    goToNextOrEndGame()
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
    potassiumClearanceValueModulation()
    toxinAccumulation()
    toxinClearance()
    console.log("Next Interval")
    render()
}


function gameOver() {
  console.log("Game Over!")
}


function toxinAccumulation() {
    currentLabValues.potassium += 1
    currentLabValues.bicarb -= 4
}

function toxinClearance() {
    runPotassiumClearance()
    bicarbClearance()
}

function roundPotassium() {
    roundedCurrentLabValues.potassium = currentLabValues.potassium.toFixed(1)
} // we only want this in the rendering output, not under the hood



function runPotassiumClearance() {
    if (allLabValues.potassium[allLabValues.potassium.length - 1] < 4.5) { return
    } else if (allLabValues.potassium[allLabValues.potassium.length - 1] >= 4.5) {
        potassiumClearance() }
}

function potassiumClearance() {
 // this will be run after user clicks "sign orders" button
    if (currentLabValues.potassium < 4.5) { return 
    } else if (clearanceValues.potassium == 1) {
        currentLabValues.potassium -= 1.5
    } else if (clearanceValues.potassium == 2) {
        currentLabValues.potassium -= 2
    }  else if (clearanceValues.potassium == 3) {
        currentLabValues.potassium -= 2.5}
    // later will need to change this when we have zeroK replacement fluid involved
}


function potassiumClearanceValueModulation() {
    if (globalReplacementFluidRateValue == 0) {
        clearanceValues.potassium = 0
    } else if (globalReplacementFluidRateValue == 1600) {
        clearanceValues.potassium = 1
    } else if (globalReplacementFluidRateValue == 2400) {
        clearanceValues.potassium = 2
    } else if (globalReplacementFluidRateValue == 3200) {
        clearanceValues.potassium = 3}
} 

// needs to be activated

function bicarbClearance() {
    // this will be run after user clicks "sign orders" button
       if (currentLabValues.bicarb < 24 && clearanceValues.bicarb === 1) {
        clearanceValues.bicarb += 4
       } else if (currentLabValues.bicarb < 24 && clearanceValues.bicarb === 2) {
        clearanceValues.bicarb += 8
       }
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


function aliveOrDead() {
    if (metabolicPhenotype <3 && hemodynamicPhenotype <3 && respiratoryPhenotype <3) {
    alive = 1
    } else {alive = 0}
} // need to call ###

function metabolicPhenotypeValues() {
    if (roundedCurrentLabValues.potassium >= 7.5) {
        metabolicPhenotype = 3
    } else if (roundedCurrentLabValues.potassium >= 6.5) {
        metabolicPhenotype = 2
    } else {metabolicPhenotype = 1}
} // need to call ###