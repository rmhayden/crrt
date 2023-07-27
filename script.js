
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

let globalUltrafiltrationRateValue

let currentLabValues = {
    potassium: 6.2,
    bicarb: 20,
    phos: 3.1,
    fourHrFluidIn: 600,
    fourHrUltrafiltration: 0,
    netFluids: 600,
    pressors: 1,
    fio2: 0.3
}


let roundedCurrentLabValues = {
    potassium: [],
    bicarb: [],
    phos: [],
    fourHrFluidIn: [],
    fourHrUltrafiltration: [],
    netFluids: [],
    pressors: [],
    fio2: []
}


let allLabValues = {
    potassium: [],
    bicarb: [],
    phos: [],
    fourHrFluidIn: [],
    fourHrUltrafiltration: [],
    netFluids: [],
    pressors: [],
    fio2: []
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

const fluidsInEl1 = document.querySelector('.in1')
const fluidsInEl2 = document.querySelector('.in2')
const fluidsInEl3 = document.querySelector('.in3')
const fluidsInEl4 = document.querySelector('.in4')
const fluidsInEl5 = document.querySelector('.in5')
const fluidsInEl6 = document.querySelector('.in6')

const fluidsOutEl1 = document.querySelector('.out1')
const fluidsOutEl2 = document.querySelector('.out2')
const fluidsOutEl3 = document.querySelector('.out3')
const fluidsOutEl4 = document.querySelector('.out4')
const fluidsOutEl5 = document.querySelector('.out5')
const fluidsOutEl6 = document.querySelector('.out6')

const fluidsNetEl1 = document.querySelector('.net1')
const fluidsNetEl2 = document.querySelector('.net2')
const fluidsNetEl3 = document.querySelector('.net3')
const fluidsNetEl4 = document.querySelector('.net4')
const fluidsNetEl5 = document.querySelector('.net5')
const fluidsNetEl6 = document.querySelector('.net6')

const pressorsEl1 = document.querySelector('.vaso1')
const pressorsEl2 = document.querySelector('.vaso2')
const pressorsEl3 = document.querySelector('.vaso3')
const pressorsEl4 = document.querySelector('.vaso4')
const pressorsEl5 = document.querySelector('.vaso5')
const pressorsEl6 = document.querySelector('.vaso6')

const fio2El1 = document.querySelector('.fio21')
const fio2El2 = document.querySelector('.fio22')
const fio2El3 = document.querySelector('.fio23')
const fio2El4 = document.querySelector('.fio24')
const fio2El5 = document.querySelector('.fio25')
const fio2El6 = document.querySelector('.fio26')


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
const gameOverSpecificFeedbackEl = document.querySelector("#specific-lethal-outcome")

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
        currentTimeIntervalEl.innerHTML = `0hr`
            potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
                phosEl1.innerHTML = `${allLabValues.phos[0]}`
                    fluidsInEl1.innerHTML = `${allLabValues.fourHrFluidIn[0]}`
                        fluidsOutEl1.innerHTML = `${allLabValues.fourHrUltrafiltration[0]}`
                            fluidsNetEl1.innerHTML = `${allLabValues.netFluids[0]}`
                                pressorsEl1.innerHTML = `${allLabValues.pressors[0]}`
                                    fio2El1.innerHTML = `${allLabValues.fio2[0]}`
    } else if (cycles === 1) {
        currentTimeIntervalEl.innerHTML = `4hr`
            potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
            potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
                phosEl1.innerHTML = `${allLabValues.phos[0]}`
                phosEl2.innerHTML = `${allLabValues.phos[1]}`
                    fluidsInEl1.innerHTML = `${allLabValues.fourHrFluidIn[0]}`
                    fluidsInEl2.innerHTML = `${allLabValues.fourHrFluidIn[1]}`
                        fluidsOutEl1.innerHTML = `${allLabValues.fourHrUltrafiltration[0]}`
                        fluidsOutEl2.innerHTML = `${allLabValues.fourHrUltrafiltration[1]}`
                            fluidsNetEl1.innerHTML = `${allLabValues.netFluids[0]}`
                            fluidsNetEl2.innerHTML = `${allLabValues.netFluids[1]}`
                                pressorsEl1.innerHTML = `${allLabValues.pressors[0]}`
                                pressorsEl2.innerHTML = `${allLabValues.pressors[1]}`
                                    fio2El1.innerHTML = `${allLabValues.fio2[0]}`
                                    fio2El2.innerHTML = `${allLabValues.fio2[1]}`
    } else if (cycles === 2) {
        currentTimeIntervalEl.innerHTML = `8hr`
            potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
            potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
            potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
                phosEl1.innerHTML = `${allLabValues.phos[0]}`
                phosEl2.innerHTML = `${allLabValues.phos[1]}`
                phosEl3.innerHTML = `${allLabValues.phos[2]}`
                    fluidsInEl1.innerHTML = `${allLabValues.fourHrFluidIn[0]}`
                    fluidsInEl2.innerHTML = `${allLabValues.fourHrFluidIn[1]}`
                    fluidsInEl3.innerHTML = `${allLabValues.fourHrFluidIn[2]}`
                        fluidsOutEl1.innerHTML = `${allLabValues.fourHrUltrafiltration[0]}`
                        fluidsOutEl2.innerHTML = `${allLabValues.fourHrUltrafiltration[1]}`
                        fluidsOutEl3.innerHTML = `${allLabValues.fourHrUltrafiltration[2]}`
                            fluidsNetEl1.innerHTML = `${allLabValues.netFluids[0]}`
                            fluidsNetEl2.innerHTML = `${allLabValues.netFluids[1]}`
                            fluidsNetEl3.innerHTML = `${allLabValues.netFluids[2]}`
                                pressorsEl1.innerHTML = `${allLabValues.pressors[0]}`
                                pressorsEl2.innerHTML = `${allLabValues.pressors[1]}`
                                pressorsEl3.innerHTML = `${allLabValues.pressors[2]}`
                                    fio2El1.innerHTML = `${allLabValues.fio2[0]}`
                                    fio2El2.innerHTML = `${allLabValues.fio2[1]}`
                                    fio2El3.innerHTML = `${allLabValues.fio2[2]}`
    } else if (cycles === 3) {
        currentTimeIntervalEl.innerHTML = `12hr`
            potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
            potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
            potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
            potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
                phosEl1.innerHTML = `${allLabValues.phos[0]}`
                phosEl2.innerHTML = `${allLabValues.phos[1]}`
                phosEl3.innerHTML = `${allLabValues.phos[2]}`
                phosEl4.innerHTML = `${allLabValues.phos[3]}`
                    fluidsInEl1.innerHTML = `${allLabValues.fourHrFluidIn[0]}`
                    fluidsInEl2.innerHTML = `${allLabValues.fourHrFluidIn[1]}`
                    fluidsInEl3.innerHTML = `${allLabValues.fourHrFluidIn[2]}`
                    fluidsInEl4.innerHTML = `${allLabValues.fourHrFluidIn[3]}`
                        fluidsOutEl1.innerHTML = `${allLabValues.fourHrUltrafiltration[0]}`
                        fluidsOutEl2.innerHTML = `${allLabValues.fourHrUltrafiltration[1]}`
                        fluidsOutEl3.innerHTML = `${allLabValues.fourHrUltrafiltration[2]}`
                        fluidsOutEl4.innerHTML = `${allLabValues.fourHrUltrafiltration[3]}`
                            fluidsNetEl1.innerHTML = `${allLabValues.netFluids[0]}`
                            fluidsNetEl2.innerHTML = `${allLabValues.netFluids[1]}`
                            fluidsNetEl3.innerHTML = `${allLabValues.netFluids[2]}`
                            fluidsNetEl4.innerHTML = `${allLabValues.netFluids[3]}`
                                pressorsEl1.innerHTML = `${allLabValues.pressors[0]}`
                                pressorsEl2.innerHTML = `${allLabValues.pressors[1]}`
                                pressorsEl3.innerHTML = `${allLabValues.pressors[2]}`
                                pressorsEl4.innerHTML = `${allLabValues.pressors[3]}`
                                    fio2El1.innerHTML = `${allLabValues.fio2[0]}`
                                    fio2El2.innerHTML = `${allLabValues.fio2[1]}`
                                    fio2El3.innerHTML = `${allLabValues.fio2[2]}`
                                    fio2El4.innerHTML = `${allLabValues.fio2[3]}`
    } else if (cycles === 4) {
        currentTimeIntervalEl.innerHTML = `16hr`
            potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
            potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
            potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
            potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
            potassiumEl5.innerHTML = `${allLabValues.potassium[4]}`
                phosEl1.innerHTML = `${allLabValues.phos[0]}`
                phosEl2.innerHTML = `${allLabValues.phos[1]}`
                phosEl3.innerHTML = `${allLabValues.phos[2]}`
                phosEl4.innerHTML = `${allLabValues.phos[3]}`
                phosEl5.innerHTML = `${allLabValues.phos[4]}`
                    fluidsInEl1.innerHTML = `${allLabValues.fourHrFluidIn[0]}`
                    fluidsInEl2.innerHTML = `${allLabValues.fourHrFluidIn[1]}`
                    fluidsInEl3.innerHTML = `${allLabValues.fourHrFluidIn[2]}`
                    fluidsInEl4.innerHTML = `${allLabValues.fourHrFluidIn[3]}`
                    fluidsInEl5.innerHTML = `${allLabValues.fourHrFluidIn[4]}`
                        fluidsOutEl1.innerHTML = `${allLabValues.fourHrUltrafiltration[0]}`
                        fluidsOutEl2.innerHTML = `${allLabValues.fourHrUltrafiltration[1]}`
                        fluidsOutEl3.innerHTML = `${allLabValues.fourHrUltrafiltration[2]}`
                        fluidsOutEl4.innerHTML = `${allLabValues.fourHrUltrafiltration[3]}`
                        fluidsOutEl5.innerHTML = `${allLabValues.fourHrUltrafiltration[4]}`
                            fluidsNetEl1.innerHTML = `${allLabValues.netFluids[0]}`
                            fluidsNetEl2.innerHTML = `${allLabValues.netFluids[1]}`
                            fluidsNetEl3.innerHTML = `${allLabValues.netFluids[2]}`
                            fluidsNetEl4.innerHTML = `${allLabValues.netFluids[3]}`
                            fluidsNetEl5.innerHTML = `${allLabValues.netFluids[4]}`
                                pressorsEl1.innerHTML = `${allLabValues.pressors[0]}`
                                pressorsEl2.innerHTML = `${allLabValues.pressors[1]}`
                                pressorsEl3.innerHTML = `${allLabValues.pressors[2]}`
                                pressorsEl4.innerHTML = `${allLabValues.pressors[3]}`
                                pressorsEl5.innerHTML = `${allLabValues.pressors[4]}`
                                    fio2El1.innerHTML = `${allLabValues.fio2[0]}`
                                    fio2El2.innerHTML = `${allLabValues.fio2[1]}`
                                    fio2El3.innerHTML = `${allLabValues.fio2[2]}`
                                    fio2El4.innerHTML = `${allLabValues.fio2[3]}`
                                    fio2El5.innerHTML = `${allLabValues.fio2[4]}`
    } else if (cycles === 5) {
        currentTimeIntervalEl.innerHTML = `20hr`
            potassiumEl1.innerHTML = `${allLabValues.potassium[0]}`
            potassiumEl2.innerHTML = `${allLabValues.potassium[1]}`
            potassiumEl3.innerHTML = `${allLabValues.potassium[2]}`
            potassiumEl4.innerHTML = `${allLabValues.potassium[3]}`
            potassiumEl5.innerHTML = `${allLabValues.potassium[4]}`
            potassiumEl6.innerHTML = `${allLabValues.potassium[5]}`
                phosEl1.innerHTML = `${allLabValues.phos[0]}`
                phosEl2.innerHTML = `${allLabValues.phos[1]}`
                phosEl3.innerHTML = `${allLabValues.phos[2]}`
                phosEl4.innerHTML = `${allLabValues.phos[3]}`
                phosEl5.innerHTML = `${allLabValues.phos[4]}`
                phosEl6.innerHTML = `${allLabValues.phos[5]}`
                    fluidsInEl1.innerHTML = `${allLabValues.fourHrFluidIn[0]}`
                    fluidsInEl2.innerHTML = `${allLabValues.fourHrFluidIn[1]}`
                    fluidsInEl3.innerHTML = `${allLabValues.fourHrFluidIn[2]}`
                    fluidsInEl4.innerHTML = `${allLabValues.fourHrFluidIn[3]}`
                    fluidsInEl5.innerHTML = `${allLabValues.fourHrFluidIn[4]}`
                    fluidsInEl6.innerHTML = `${allLabValues.fourHrFluidIn[5]}`
                        fluidsOutEl1.innerHTML = `${allLabValues.fourHrUltrafiltration[0]}`
                        fluidsOutEl2.innerHTML = `${allLabValues.fourHrUltrafiltration[1]}`
                        fluidsOutEl3.innerHTML = `${allLabValues.fourHrUltrafiltration[2]}`
                        fluidsOutEl4.innerHTML = `${allLabValues.fourHrUltrafiltration[3]}`
                        fluidsOutEl5.innerHTML = `${allLabValues.fourHrUltrafiltration[4]}`
                        fluidsOutEl6.innerHTML = `${allLabValues.fourHrUltrafiltration[5]}`
                            fluidsNetEl1.innerHTML = `${allLabValues.netFluids[0]}`
                            fluidsNetEl2.innerHTML = `${allLabValues.netFluids[1]}`
                            fluidsNetEl3.innerHTML = `${allLabValues.netFluids[2]}`
                            fluidsNetEl4.innerHTML = `${allLabValues.netFluids[3]}`
                            fluidsNetEl5.innerHTML = `${allLabValues.netFluids[4]}`
                            fluidsNetEl6.innerHTML = `${allLabValues.netFluids[5]}`
                                pressorsEl1.innerHTML = `${allLabValues.pressors[0]}`
                                pressorsEl2.innerHTML = `${allLabValues.pressors[1]}`
                                pressorsEl3.innerHTML = `${allLabValues.pressors[2]}`
                                pressorsEl4.innerHTML = `${allLabValues.pressors[3]}`
                                pressorsEl5.innerHTML = `${allLabValues.pressors[4]}`
                                pressorsEl6.innerHTML = `${allLabValues.pressors[5]}`
                                    fio2El1.innerHTML = `${allLabValues.fio2[0]}`
                                    fio2El2.innerHTML = `${allLabValues.fio2[1]}`
                                    fio2El3.innerHTML = `${allLabValues.fio2[2]}`
                                    fio2El4.innerHTML = `${allLabValues.fio2[3]}`
                                    fio2El5.innerHTML = `${allLabValues.fio2[4]}`
                                    fio2El6.innerHTML = `${allLabValues.fio2[5]}`
    }
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
    hemodynamicPhenotypeValues()
    console.log("hemodynamic phenotype: " + hemodynamicPhenotype)
    console.log("current pressors: " + currentLabValues.pressors)
    console.log("current rounded pressors: " + roundedCurrentLabValues.pressors)
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
  } else {
    gameOverFeedback.innerHTML = "Your patient has passed away"
    wasMetabolicLethal()
    wasRespiratoryLethal()
    wasHemodynamicLethal()
  }
}

  
function wasMetabolicLethal() {
    if (metabolicPhenotype < 3) {
        return
    } else if (currentLabValues.potassium >= 7.5) {
            gameOverSpecificFeedbackEl.innerHTML = "The patient died of hyperkalemia. A 0K replacement fluid and/or higher replacement fluid rate may have been better optimized"
        } else if (currentLabValues.potassium <= 2.5 && roundedCurrentLabValues.phos < 1.5) {
            gameOverSpecificFeedbackEl.innerHTML = "The patient died of hypokalemia and hypophosphatemia. Be careful when using replacement fluids that do not contain potassium and phosphorus if you are not otherwise providing careful supplementation"
        } else if (currentLabValues.potassium <= 2.5) {
            gameOverSpecificFeedbackEl.innerHTML = "The patient died of hypokalemia. Be careful when using replacement fluids that do not contain potassium if you are not otherwise providing careful supplementation"
        } else if (currentLabValues.phos < 1.5) {
            "The patient died of hypophosphatemia. Be careful when using replacement fluids that do not contain phosphorus if you are not otherwise providing careful supplementation"
        } 
}

function wasRespiratoryLethal() {
    if (respiratoryPhenotype < 3) {
        return
    } else if (currentLabValues.fio2 > 0.9) {
        gameOverSpecificFeedbackEl.innerHTML = "The patient died of respiratory failure due to fluid overload. Be mindful of progressive volume overload as you consider adjustments of the ultrafiltration rate, as hemodynamics permit."
    }
}

function wasHemodynamicLethal() {
    if (hemodynamicPhenotype < 3) {
        return
    } else if (currentLabValues.pressors = 3) {
        gameOverSpecificFeedbackEl.innerHTML = "The patient died of worsening shock, precipitated by an excessively high rate of ultrafiltration."
    }
}




function refreshPage() {
    location.reload()
}

function toxinAccumulation() {
    currentLabValues.potassium += 1
    currentLabValues.bicarb -= 4
    currentLabValues.phos += 0.5
    currentLabValues.fourHrFluidIn += 100
    
    ultrafiltrationConversion()

    currentLabValues.netFluids = currentLabValues.fourHrFluidIn - currentLabValues.fourHrUltrafiltration

    if (Math.abs(currentLabValues.netFluids) > 1800) {
        currentLabValues.pressors = 3
    // } else if (Math.abs(currentLabValues.netFluids) > 1000) {
    //     currentLabValues.pressors = 2
    } else {currentLabValues.pressors = 1}

    // cannot use absolute value here!


    if (currentLabValues.netFluids > 1000) {
    currentLabValues.fio2 = 1.0 
    } else if (currentLabValues.netFluids > 500) {
        currentLabValues.fio2 = 0.8
    } else if (currentLabValues.netFluids <= 500) {
        currentLabValues.fio2 = 0.3
    } 
} 

function ultrafiltrationConversion () {
if (convertedUltrafiltrationRate === undefined) {
    currentLabValues.fourHrUltrafiltration = 0
} else {currentLabValues.fourHrUltrafiltration = convertedUltrafiltrationRate*4}
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
    roundedCurrentLabValues.fourHrFluidIn = currentLabValues.fourHrFluidIn.toFixed(0)
    roundedCurrentLabValues.fourHrUltrafiltration = currentLabValues.fourHrUltrafiltration.toFixed(1)
    roundedCurrentLabValues.netFluids = currentLabValues.netFluids.toFixed(0)
    roundedCurrentLabValues.pressors = currentLabValues.pressors.toFixed(0)
    roundedCurrentLabValues.fio2 = currentLabValues.fio2.toFixed(1)
} // for now this function is named roundPhos but is applied to all other values


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

    hypoPhosPhenotype()

    if (currentLabValues.potassium <= 2.5) {
        metabolicPhenotype = 3;
    } else if (currentLabValues.potassium >= 7.5) {
        metabolicPhenotype = 3
    } else if (currentLabValues.potassium >= 6.5) {
        metabolicPhenotype = 2
    } else {metabolicPhenotype = 1}
} 

function hypoPhosPhenotype() {
    if (currentLabValues.phos < 1.5) {
        metabolicPhenotype = 3}
}

function respiratoryPhenotypeValues() {
    if (currentLabValues.fio2 > 0.9) {
        respiratoryPhenotype = 3}
}
// need to add fio2 to this
// also need a function for fio2 to be impacted by net fluid values

function hemodynamicPhenotypeValues() {
    if (currentLabValues.pressors == 3) {
        hemodynamicPhenotype = 3} 
}