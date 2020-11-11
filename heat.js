"use strict";

//models for clickable items in the game
window.radiatorLeft = {
    onElement:"#heat_radi_left_on",
    heatOn: true
}

window.radiatorRight = {
    onElement:"#heat_radi_right_on",
    heatOn: false
}

window.heatFloor = {
    onElement:"#heat_floor",
    heatOn: false
}

//model for user inputs
const heatInputs = {
    radiatorLeftClicked: false,
    radiatorRightClicked: false,
    floorClicked: false
}


async function heatInit(){
    document.querySelector("#medal_container").classList.add("hide");
    game.points = 0;
    document.querySelector("#game").innerHTML = await getSVG("heat"); //får det returnede SVG
    document.querySelector("#hej").play();
    document.querySelector("#back").classList.remove("hide");
    heatEvents();
    heatLoop();
    addHeatAnimations();
}

//user inputs enables clickevents
function heatEvents() {
    document.querySelector(radiatorLeft.onElement).addEventListener("click", ()=> heatInputs.radiatorLeftClicked = true);
    document.querySelector(radiatorRight.onElement).addEventListener("click", ()=> heatInputs.radiatorRightClicked = true);
    document.querySelector(heatFloor.onElement).addEventListener("click", ()=> heatInputs.heatFloor = true);
}

function heatLoop(){
    Object.keys(heatInputs).forEach(key =>{

        if(heatInputs[key]){
            window[key.split("Clicked")[0]].heatOn = !heatInputs[key]; //splits the key from the inputmodel to take the first part that corrisponds to the variable for model items.
            heatInputs[key] = false;
            game.points++
            heatRenderModel(window[key.split("Clicked")[0]]);
            winCondition("heat");
        }    
    })
requestAnimationFrame(heatLoop);
}

function heatRenderModel(model){
    if(model.heatOn){
        document.querySelector(model.onElement).classList.remove("hide");
    } else{
        document.querySelector(model.onElement).classList.add("hide");
        heatHunter(model);
    }

}

function heatHunter(model) {
    let elementTarget = document.querySelector(model.onElement);
    
    if(game.points < 8) {
        setTimeout(() => {
        elementTarget.classList.remove("hide");
        heheSound();
        addHeatAnimations();
        }, randomTime());
    }
}

function addHeatAnimations() {
    document.querySelector("#heat_floor").classList.add("levitate");  
}
