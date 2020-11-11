
"use strict";
// each object represents an item that the player can interact with
// they each has a set of properties that are used later for the game loop
window.lamp = {
    lightElement: "#lampLight",
    lightOn: true
}

window.floorLamp = {
    lightElement: "#floorLampLight",
    lightOn: true
}

window.tent = {
    lightElement:"#tentLight",
    lightOn: true
}
// this is the model and it is used later to check whether or not an element has been clicked
const lightInputs = {
    lampLightClicked: false,
    floorLampLightClicked: false,
    tentLightClicked: false
}
// in-game display is defined here with sounds and visuals
async function lightInit(){
    document.querySelector("#medal_container").classList.add("hide");
    game.points = 0;
    document.querySelector("#game").innerHTML = await getSVG("light");
    document.querySelector("#hej").play();
    document.querySelector("#back").classList.remove("hide");
    lightEvents();
    lightLoop();
    addLightAnimations();
}

function lightEvents() {
        // eventlisteners for all objects
    document.querySelector(lamp.lightElement).addEventListener("click", ()=> lightInputs.lampLightClicked = true);
    document.querySelector(floorLamp.lightElement).addEventListener("click", ()=> lightInputs.floorLampLightClicked = true);
    document.querySelector(tent.lightElement).addEventListener("click", ()=> lightInputs.tentLightClicked = true);
}

function lightLoop(){
        //each object is called a key and gets split from the inputmodel to take the first part that corresponds to the variable for model items
    Object.keys(lightInputs).forEach(key =>{

    if(lightInputs[key]){
        window[key.split("Light")[0]].lightOn = !lightInputs[key];
        lightInputs[key] = false;
        game.points++
        lightRenderModel(window[key.split("Light")[0]]);
        winCondition("light");
    }    
})
requestAnimationFrame(lightLoop);
}
// it is checked whether an element is off or on and then does something in either case
function lightRenderModel(model){
    if(model.lightOn){
        document.querySelector(model.lightElement).classList.remove("hide");
    } else{
        document.querySelector(model.lightElement).classList.add("hide");
        document.querySelector(model.lightElement).classList.remove("glow");
        lightHunter(model);
    }
}
// this function simulates the hunter turning something on again
function lightHunter(model) {
    let elementTarget = document.querySelector(model.lightElement);

    if(game.points < 8) {
        setTimeout(() => {
        elementTarget.classList.remove("hide");
        heheSound();
        addLightAnimations();
        }, randomTime());
    }
}
// animations
function addLightAnimations() {
    document.querySelector("#lampLight").classList.add("glow");
    document.querySelector("#floorLampLight").classList.add("glow");
    document.querySelector("#tentLight").classList.add("glow");
}
