"use strict";

//Starts rotate function when device is rotated (onrotationchange is outdated, and screen is resized on rotation)
window.onresize = rotate;

document.addEventListener("click", event =>{
    document.querySelector("#click").play();
})

let game = {
    points: 0,
    maxPoints: 10,
    medal:0,
    complete:[]
}

let mySeconds = [1000, 2000, 3000];

document.addEventListener("DOMContentLoaded", mainInit);

async function getSVG(filename) {
    let response = await fetch(`svgs/${filename}.svg`);
    let mySvgData = await response.text();
    return mySvgData; 
}

//Game startscreen
async function mainInit(){
    document.querySelector("#game").innerHTML =  await getSVG("start_screen");

    rotate(); 

    document.querySelector("#play_button").classList.add("wiggle");
    document.querySelectorAll("#icons g").forEach(icon => icon.classList.add("levitate2"));

    document.querySelector("#medal_container").classList.add("hide");
    document.querySelector("#music_on_off").classList.add("hide");
    document.querySelector("#back").classList.add("hide");
    document.querySelector("#medal_win").classList.add("hide");
    document.querySelector("div#snif").classList.add("hide");

    document.querySelector("#play_button").addEventListener("click", initialState);  

}

function rotate() {
    if(window.innerWidth<window.innerHeight) {
        document.querySelector("#rotation").classList.remove("hide");
    } else {
        document.querySelector("#rotation").classList.add("hide");
    }
}

function randomTime() {
    return mySeconds[Math.floor(Math.random()*mySeconds.length)];
}


async function winCondition(house){
    if(game.points === game.maxPoints){
        game.medal++; 
        game.complete.push(house); //adds the complete house to an array
        await initialState(); //Goes back to game-map
        document.querySelectorAll(".gray")[0].className = "full";
        document.querySelector("#medal_win").classList.remove("hide");
        document.querySelector("#medal_win").classList.add("pulse");
        document.querySelector("#medal_win").addEventListener("animationend", () => {
            document.querySelector("#medal_win").classList.add("shrink");
            if(game.medal == 4) {
                setTimeout(() => {
                    displayEndScreen();
                }, 2000);   
            }    
        });
        window.setTimeout(hideBigMedal, 3000);
    } 
}

function hideBigMedal() {
    document.querySelector("#medal_win").classList.add("hide");
    document.querySelector("#medal_win").classList.remove("pulse");
    document.querySelector("#medal_win").classList.remove("shrink");
}

async function initialState(){
    //Swiches background to game-map
    document.querySelector("#game").innerHTML =  await getSVG("main");

    document.querySelector("#medal_container").classList.remove("hide");
    document.querySelector("#music_on_off").classList.remove("hide");
    document.querySelector("#back").classList.add("hide");

    document.querySelector("#main_water").addEventListener("click", waterInit); //#water er husnavn svg
    document.querySelector("#main_power").addEventListener("click", powerInit);
    document.querySelector("#main_light").addEventListener("click", lightInit);
    document.querySelector("#main_heat").addEventListener("click", heatInit);
    document.querySelector("#main_water_on").addEventListener("click", waterInit); //#water er husnavn svg
    document.querySelector("#main_power_on").addEventListener("click", powerInit);
    document.querySelector("#main_light_on").addEventListener("click", lightInit);
    document.querySelector("#main_heat_on").addEventListener("click", heatInit);

    document.querySelector("#snif").classList.remove("hide");

    //Adds animations to houses
    document.querySelector("#main_water_on").classList.add("levitate");
    document.querySelector("#main_power_on").classList.add("levitate");
    document.querySelector("#main_light_on").classList.add("levitate");
    document.querySelector("#main_heat_on").classList.add("levitate");
    
    musicStart();
    
    document.querySelector("#back").addEventListener("click", initialState);

    game.complete.forEach(houseComplete);
}

function musicStart() {
    if(document.querySelector("#music_on_off").classList.contains("off")) {
        document.querySelector("#backgroundmusic").pause();
    } else {
        document.querySelector("#backgroundmusic").loop = true;
        document.querySelector("#backgroundmusic").play();
        document.querySelector("#music_on_off").addEventListener("click", musicOff);
    }
}

function musicOn() {
    document.querySelector("#music_on_off").removeEventListener("click", musicOn);
    document.querySelector("#music_on_off").classList.remove("off");
    document.querySelector("#backgroundmusic").play();
    document.querySelector("#music_on_off").addEventListener("click", musicOff);
}

function musicOff() {
    document.querySelector("#music_on_off").removeEventListener("click", musicOff);
    document.querySelector("#backgroundmusic").pause();
    document.querySelector("#music_on_off").classList.add("off");

    document.querySelector("#music_on_off").addEventListener("click", musicOn);
}

function heheSound() {
    let randSound = Math.floor(Math.random()*2);

    if(randSound==0) {
        document.querySelector("#hehe").play();
    } else if(randSound==1) {
        document.querySelector("#hvad").play();
    }
}

function houseComplete(house){
    //Removes water/lightnings/heat/light around completed houses
    document.querySelector(`#main_${house}_on`).classList.add("hide");   
    
    //Removes access to completed houses
    document.querySelector(`#main_${house}`).removeEventListener("click", window[`${house}Init`]);  
    document.querySelector(`#main_${house}_on`).removeEventListener("click", window[`${house}Init`]);
}

async function displayEndScreen() {
    await initialState();
    
    document.querySelector("#slut").play();
    document.querySelector("#game").innerHTML =  await getSVG("end_screen");
    document.querySelector("#snif").classList.add("hide");

    document.querySelector("#medal_container").classList.add("move_medals");

    window.setTimeout(restart, 15000)
}

//Refreshes page for an easy reset of the game
function restart() {
    location.reload();
}
    



