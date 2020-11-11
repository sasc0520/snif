"use strict";

// each object represents an item that the player can interact with
// they each has a set of properties that are used later for the game loop
window.vacuum = {
    powerElement: "#power_vacuum_on",
    element:"#power_vacuum_off",
    powerOn: true
}


window.modem = {
    powerElement: "#power_modem_on",
    powerOn: true
}

window.tv = {
    powerElement:"#power_on",
    powerOn: true
}

// this is the model and it is used later to check whether or not an element has been clicked
const powerInputs = {
    vacuumPowerClicked: false,
    modemPowerClicked: false,
    tvPowerClicked: false
}
// in-game display is defined here with sounds and visuals
async function powerInit(){
    document.querySelector("#medal_container").classList.add("hide");
    game.points = 0;
    document.querySelector("#game").innerHTML = await getSVG("power");
    document.querySelector("#hej").play();
    document.querySelector("#back").classList.remove("hide");
    powerEvents();
    powerLoop();
    addPowerAnimations();
}

function powerEvents() {
    // eventlisteners for all objects
    document.querySelector(vacuum.powerElement).addEventListener("click", ()=> powerInputs.vacuumPowerClicked = true);
    document.querySelector(modem.powerElement).addEventListener("click", ()=> powerInputs.modemPowerLightClicked = true);
    document.querySelector(tv.powerElement).addEventListener("click", ()=> powerInputs.tvPowerClicked = true);
}

function powerLoop(){
    //each object is called a key and gets split from the inputmodel to take the first part that corresponds to the variable for model items
    Object.keys(powerInputs).forEach(key =>{

        if(powerInputs[key]){
            window[key.split("Power")[0]].powerOn = !powerInputs[key];
            powerInputs[key] = false;
            game.points++
            powerRenderModel(window[key.split("Power")[0]]);
            winCondition("power");
        }    
    })
requestAnimationFrame(powerLoop);
}
// it is checked whether an element is off or on and then does something in either case
function powerRenderModel(model){
    if(model.powerOn){
        document.querySelector(model.powerElement).classList.remove("hide");
    } else{
        document.querySelector(model.powerElement).classList.add("hide");
        if(model == vacuum) {
            document.querySelector("#power_vacuum_off").classList.remove("shake");
            document.querySelector("#power_vacuum_on").classList.remove("shake");
        }
    }
    powerHunter(model);
}
// this function simulates the hunter turning something on again
function powerHunter(model) {
    let elementTarget = document.querySelector(model.powerElement);

    if(game.points < 8) {
        setTimeout(() => {
        elementTarget.classList.remove("hide");
        heheSound();
        addPowerAnimations();
        
        }, randomTime());
    }
}
// animations
function addPowerAnimations() {
    document.querySelector("#power_vacuum_off").classList.add("shake");
    document.querySelector("#power_vacuum_on").classList.add("shake");
}
