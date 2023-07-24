


/*----- CONSTANTS -----*/


/*----- STATE VARIABLES -----*/


let currentLabValues = {
    potassium: 5,
    bicarb: 20
}

let allLabValues = {
    potassium: [],
    bicarb: []
}

/*----- CACHED ELEMENTS  -----*/


const allLabValueEls = {
    potassiumEl: []

}
// these have to be an array so we can add to it


/*----- EVENT LISTENERS -----*/


/*----- FUNCTIONS -----*/


function init() {
    
    appendNewLabValues()
}


function render() {

    appendNewLabValues()
}


function appendNewLabValues() {
    for (let key in allLabValues) {
        allLabValues[key].push((`${currentLabValues[key]}`))
        // console.log(`${allLabValues[key]}`)
        }   
    }


