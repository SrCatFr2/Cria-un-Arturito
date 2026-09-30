import { gameState } from "./state.js";
import { clamp } from "./stats.js";

export function updateMood() {
    const a = gameState.arturito;

    if (a.hunger < 20) {
        a.currentMood = "hungry";
        return;
    }

    if (a.happiness < 20) {
        a.currentMood = "sad";
        return;
    }

    if (a.confidence > 80 && a.intelligence < 50) {
        a.currentMood = "confident_idiot";
        return;
    }

    if (a.nerd > 80) {
        a.currentMood = "nerdy";
        return;
    }

    if (a.trust < 20) {
        a.currentMood = "distant";
        return;
    }

    if (a.happiness > 80) {
        a.currentMood = "happy";
        return;
    }

    a.currentMood = "normal";
}

export function getPersonality() {
    const a = gameState.arturito;

    return {
        nerd: a.nerd,
        sarcasm: a.personality.sarcasm,
        stubbornness: a.personality.stubbornness,
        creativity: a.personality.creativity,
        logic: a.personality.logic
    };
}

export function shouldTwistWords() {
    const a = gameState.arturito;

    const probability =
        a.personality.sarcasm * 0.5 +
        a.confidence * 0.2 +
        a.intelligence * 0.1;

    return Math.random() * 100 < probability;
}

export function shouldPretendNotToHear() {
    const a = gameState.arturito;

    return (
        a.personality.stubbornness > 60 &&
        a.trust < 45 &&
        Math.random() < 0.65
    );
}

export function getReaction(type) {
    const a = gameState.arturito;

    if (type === "insult") {
        if (shouldPretendNotToHear()) {
            return {
                speaker: "Arturito",
                text: "...",
                action: "ignore"
            };
        }

        if (shouldTwistWords()) {
            return {
                speaker: "Arturito",
                text: "¿Eso fue un argumento o solamente una descripción?",
                action: "wordplay"
            };
        }

        return {
            speaker: "Arturito",
            text: "Me da igual.",
            action: "hide_emotion"
        };
    }

    if (type === "compliment") {
        if (a.confidence > 75) {
            return {
                speaker: "Arturito",
                text: "Ya sé.",
                action: "confidence_up"
            };
        }

        return {
            speaker: "Arturito",
            text: "¿De verdad?",
            action: "happy"
        };
    }

    return {
        speaker: "Arturito",
        text: "...",
        action: null
    };
}

export function addTrait(trait) {
    if (!gameState.arturito.traits.includes(trait)) {
        gameState.arturito.traits.push(trait);
    }
}

export function hasTrait(trait) {
    return gameState.arturito.traits.includes(trait);
}
