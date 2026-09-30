import { gameState } from "./state.js";

const SAVE_KEY = "cria_un_arturito_save_v1";

export function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(gameState)
    );
}

export function loadGame() {

    const data = localStorage.getItem(SAVE_KEY);

    if (!data) return false;

    try {

        const parsed = JSON.parse(data);

        Object.assign(gameState, parsed);

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

export function hasSave() {
    return localStorage.getItem(SAVE_KEY) !== null;
}
