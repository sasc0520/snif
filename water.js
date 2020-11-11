"use strict";

//models for clickable items in the game
window.fossett = {
    element: "#fossett",
    waterElement: "#fossettWater",
    waterOn: true
}

window.dishwasher = {
    element: "#dishwasher",
    waterElement: "#dishwasherWater",
    waterOn: true
}

window.waterhose = {
    element: "#waterhoseWater",
    waterElement: "#waterhoseWater",
    waterOn: true
}

//model for user inputs
const waterInputs = {
    fossettWaterClicked: false,
    dishwasherWaterClicked: false,
    waterhoseWaterClicked: false
}


async function waterInit(){
    document.querySelector("#medal_container").classList.add("hide");
    game.points = 0;
    document.querySelector("#game").innerHTML = await getSVG("water");
    document.querySelector("#hej").play();
    document.querySelector("#back").classList.remove("hide");
    waterEvents();
    waterLoop();
    addWaterAnimations();
}

//user inputs enables clickevents
function waterEvents() {
    document.querySelector(fossett.waterElement).addEventListener("click", ()=> waterInputs.fossettWaterClicked = true);
    document.querySelector(dishwasher.element).addEventListener("click", ()=> waterInputs.dishwasherWaterClicked = true);
    document.querySelector(waterhose.element).addEventListener("click", ()=> waterInputs.waterhoseWaterClicked = true);
}

function waterLoop(){
    Object.keys(waterInputs).forEach(key =>{
        if(waterInputs[key]){
            window[key.split("Water")[0]].waterOn = !waterInputs[key]; //splits the key from the inputmodel to take the first part that corrisponds to the variable for model items.
            waterInputs[key] = false;
            game.points++
            waterRenderModel(window[key.split("Water")[0]]);
            winCondition("water");
        }    
    })
requestAnimationFrame(waterLoop);
}

function waterRenderModel(model){
    if(model.waterOn){
        document.querySelector(model.waterElement).classList.remove("hide");
    } else{
        document.querySelector(model.waterElement).classList.add("hide");
        if(model == dishwasher) {
            document.querySelector("#dishwasher").classList.remove("vibrate");
        } else if(model == waterhose) {
            document.querySelector("#waterhoseWater").classList.remove("swing");
        }
        waterHunter(model);
    }
}

function waterHunter(model) {
    let elementTarget = document.querySelector(model.waterElement);
    
    if(game.points < 8) {
        setTimeout(() => {
            elementTarget.classList.remove("hide");
            heheSound();
            addWaterAnimations();
        }, randomTime());
    }
}

function addWaterAnimations() {
    document.querySelector("#dishwasher").classList.add("vibrate");
    document.querySelector("#waterhoseWater").classList.add("swing");
}