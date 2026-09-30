import { gameState } from "./state.js";
import { loadGame } from "./save.js";
import { startPrologue } from "./scenes.js";


export function updateStats() {

    document.getElementById("age").textContent =
        gameState.age;

    document.getElementById("hunger").textContent =
        clamp(gameState.hunger);

    document.getElementById("happiness").textContent =
        clamp(gameState.happiness);

    document.getElementById("intelligence").textContent =
        clamp(gameState.intelligence);

    document.getElementById("stupidity").textContent =
        clamp(gameState.stupidity);

    document.getElementById("money").textContent =
        Math.max(0, gameState.money);

}


function clamp(value) {

    return Math.max(
        0,
        Math.min(100, Math.round(value))
    );

}


function startGame() {

    const loaded = loadGame();

    updateStats();

    if (loaded && gameState.started) {

        /*
         * De momento comenzamos desde la primera
         * escena jugable mientras construimos
         * el sistema de continuar.
         */

        startPrologue();

        return;
    }

    startPrologue();

}


startGame();
