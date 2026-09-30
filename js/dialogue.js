import { gameState } from "./state.js";
import { shouldTwistWords } from "./character.js";

export function conditionMet(condition) {

    if (!condition) return true;

    if (condition.type === "stat") {
        return gameState.arturito[condition.stat] >= condition.value;
    }

    if (condition.type === "flag") {
        return gameState.flags[condition.flag] === condition.value;
    }

    if (condition.type === "money") {
        return gameState.player.money >= condition.value;
    }

    if (condition.type === "item") {
        return gameState.inventory.some(
            item => item.id === condition.value
        );
    }

    return false;
}

export function getAvailableChoices(choices) {
    return choices.filter(choice =>
        conditionMet(choice.condition)
    );
}

export function chooseDialogue(choice) {

    if (choice.effects) {
        applyEffects(choice.effects);
    }

    if (choice.setFlag) {
        gameState.flags[choice.setFlag] = true;
    }

    return choice.next;
}

function applyEffects(effects) {

    for (const effect of effects) {

        const target = getTarget(effect.target);

        if (!target) continue;

        target.value += effect.amount;

        if (
            typeof target.value === "number" &&
            effect.clamp
        ) {
            target.value = Math.max(
                0,
                Math.min(100, target.value)
            );
        }
    }
}

function getTarget(target) {

    const parts = target.split(".");

    let object = gameState;

    for (let i = 0; i < parts.length - 1; i++) {
        object = object[parts[i]];
    }

    const key = parts[parts.length - 1];

    if (!(key in object)) return null;

    return {
        get value() {
            return object[key];
        },

        set value(v) {
            object[key] = v;
        }
    };
}

export function generateArturitoResponse() {

    if (shouldTwistWords()) {

        return [
            "No entendí.",
            "Bueno, sí entendí, pero no me conviene.",
            "Técnicamente eso no fue lo que dijiste.",
            "¿Puedes repetirlo pero correctamente?",
            "Interesante elección de palabras."
        ][Math.floor(Math.random() * 5)];
    }

    return "Me da igual.";
}
