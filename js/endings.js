import { gameState } from "./state.js";

export function calculateEnding() {

    const a = gameState.arturito;

    if (
        a.trust >= 85 &&
        a.happiness >= 80 &&
        a.intelligence >= 70
    ) {
        return "genius";
    }

    if (
        a.nerd >= 90 &&
        a.intelligence >= 60
    ) {
        return "linux";
    }

    if (
        a.confidence >= 90 &&
        a.intelligence < 40
    ) {
        return "confident_idiot";
    }

    if (
        a.trust < 20
    ) {
        return "distant";
    }

    if (
        a.happiness < 20
    ) {
        return "sad";
    }

    return "normal";
}

export const endings = {

    genius: {
        title: "EL ARTURITO GENIO",
        text: "Arturito terminó convirtiéndose en alguien sorprendentemente inteligente."
    },

    linux: {
        title: "EL ARTURITO DE LINUX",
        text: "Nadie sabe exactamente qué hizo, pero ahora toda la casa corre Arch Linux."
    },

    confident_idiot: {
        title: "EL ARTURITO",
        text: "No sabe la respuesta. Pero está completamente seguro de que la sabe."
    },

    distant: {
        title: "ARTURITO SE DISTANCIÓ",
        text: "Con el tiempo dejó de contarte sus cosas."
    },

    sad: {
        title: "UN ARTURITO APAGADO",
        text: "Algo en su forma de ver las cosas cambió."
    },

    normal: {
        title: "ARTURITO",
        text: "No salió perfecto. Tampoco salió mal. Simplemente salió... Arturito."
    }
};
