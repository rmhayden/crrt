


/*----- CONSTANTS -----*/




/*----- STATE VARIABLES -----*/


let currentLabValues = {
    potassium: 7,
    bicarb: 20
}

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



/*----- EVENT LISTENERS -----*/


/*----- FUNCTIONS -----*/


function init() {

    interval = 10000 // one minute is a cycle ### To do: make timer animation
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
        console.log(`${allLabValues[key]}    `)
        }   
    }

function renderAllLabValues() {

    potassiumEl.innerHTML = `Potassium: ${allLabValues.potassium}`
    bicarbEl.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bicarb: ${allLabValues.bicarb}`

}

function continueGame(){
    // mirrored the function we used in the Tamagotchi game
    let lastCycle = cycles
    cycles++ //so game cycles increase with each 'runGame'
    console.log(`Current Cycle: ${cycles}`)

    if (lastCycle < cycles) {
    nextInterval()
    console.log(lastCycle)
    }
}

function nextInterval() {
    // either time or button event triggers next interval
    toxinAccumulation()
    toxinClearance()
    console.log("Next Interval")
    render()
}


function gameOver() {

}


function toxinAccumulation() {
    currentLabValues.potassium += 1
    currentLabValues.bicarb -= 4
}

function toxinClearance() {
    potassiumClearance()
    bicarbClearance()
}


function potassiumClearance () {
 // this will be run after user clicks "sign orders" button
    if (currentLabValues.potassium > 4 && potassiumClearanceValue === 1) {
        currentLabValues.potassium -= 1
    } else if (currentLabValues.potassium > 4 && potassiumClearanceValue === 2) {
        currentLabValues.potassium -= 2
    }
}

function bicarbClearance () {
    // this will be run after user clicks "sign orders" button
       if (currentLabValues.bicarb < 24 && bicarbClearanceValue === 1) {
            currentLabValues.bicarb += 4
       } else if (currentLabValues.bicarb < 24 && bicarbClearanceValue === 2) {
            currentLabValues.bicarb += 8
       }
   }

