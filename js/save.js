import { gameState } from "./state.js";

const SAVE_KEY = "cria_un_arturito_save";

export function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(gameState)
    );

}

export function loadGame() {

    const saved = localStorage.getItem(SAVE_KEY);

    if (!saved) {
        return false;
    }

    try {

        const data = JSON.parse(saved);

        Object.assign(gameState, data);

        return true;

    } catch (error) {

        console.error(
            "No se pudo cargar la partida:",
            error
        );

        return false;
    }
}

export function deleteSave() {

    localStorage.removeItem(SAVE_KEY);

}
