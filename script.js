


/*----- CONSTANTS -----*/




/*----- STATE VARIABLES -----*/


let currentLabValues = {
    potassium: 7,
    bicarb: 20
}

//to do ### for let to round this^ ?


let allLabValues = {
    potassium: [],
    bicarb: []
}


let potassiumClearanceValue = 2
// will later model this accurately; for now, will score 1-3 based on Rx
// for now, will just set 4 as lower limit (or zero, if zeroK)

let bicarbClearanceValue = 2
// will later model this accurately; for now, will score 1-3 based on Rx



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

    interval = 2000 // one minute is a cycle ### To do: make timer animation
    timer = setInterval(continueGame, interval)
        // mirrored the function we used in the Tamagotchi game
    cycles = 0 // starts at zero

    render()
    // continueGame() - don't need this another time in init() function
}


function render() {
    // this may be best included for DOM only? ###
    appendNewLabValues()
    renderAllLabValues()
}


function appendNewLabValues() {
    for (let key in allLabValues) {
        allLabValues[key].push((`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${currentLabValues[key]}`))
        // console.log(`${allLabValues[key]}`)
        }   
    }

function renderAllLabValues() {

        potassiumEl.innerHTML = `&nbsp;${allLabValues.potassium}`
        bicarbEl.innerHTML = `${allLabValues.bicarb}`

    

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
    } else gameOver()

}

function nextInterval() {
    // either time or button event triggers next interval
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
    potassiumClearance()
    bicarbClearance()
}


function potassiumClearance() {
 // this will be run after user clicks "sign orders" button
    if (currentLabValues.potassium > 4 && potassiumClearanceValue === 1) {
        currentLabValues.potassium -= 1
    } else if (currentLabValues.potassium > 4 && potassiumClearanceValue === 2) {
        currentLabValues.potassium -= 2
    }
}

function potassiumClearanceValueModulation() {
    if (replacementFluidRateValue = 0) {
        potassiumClearanceValue = 0
    } else if (replacementFluidRateValue = 1600) {
        potassiumClearanceValue = 1
    } else if (replacementFluidRateValue = 2400) {
    potassiumClearanceValue = 2
    } else if (replacementFluidRateValue = 3200) {
        potassiumClearanceValue = 3}
} // ### this needs to be activated

function bicarbClearance() {
    // this will be run after user clicks "sign orders" button
       if (currentLabValues.bicarb < 24 && bicarbClearanceValue === 1) {
            currentLabValues.bicarb += 4
       } else if (currentLabValues.bicarb < 24 && bicarbClearanceValue === 2) {
            currentLabValues.bicarb += 8
       }
}


function updateRFRValue () {
  // SRC: https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
    document.getElementById("replacement-fluid-rate").innerHTML = "";
    let el = document.getElementsByTagName('input');
    for (i = 0; i < el.length; i++) {
        if (el[i].checked) {
            replacementFluidRateValue = el[i].value
            // console.log(replacementFluidRateValue)
            document.getElementById("replacement-fluid-rate").innerHTML = `Replacement Fluid Rate: ${replacementFluidRateValue}`
        }
    } 
}


function round (num) {
    return num.toFixed(1)
} // may need this later to round the lab values

