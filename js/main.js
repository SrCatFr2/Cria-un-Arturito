import { gameState } from "./state.js";
import { loadGame, saveGame } from "./save.js";
import { actions } from "./actions.js";
import { scenes } from "./scenes.js";
import { updateMood } from "./character.js";

export function startGame() {

    gameState.started = true;

    updateMood();

    saveGame();

    console.log("Cría un Arturito iniciado.");
}

export function performAction(actionName, ...args) {

    const action = actions[actionName];

    if (!action) {
        console.error(
            `Acción desconocida: ${actionName}`
        );

        return null;
    }

    const result = action(...args);

    updateMood();

    saveGame();

    return result;
}

export function getScene(sceneId) {

    return scenes[sceneId] ?? null;
}

export function getState() {
    return gameState;
}

export function continueGame() {

    if (loadGame()) {
        updateMood();
        return true;
    }

    startGame();

    return false;
}

window.ArturitoGame = {
    startGame,
    continueGame,
    performAction,
    getScene,
    getState
};
