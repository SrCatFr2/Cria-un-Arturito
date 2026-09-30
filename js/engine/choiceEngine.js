"use strict";

import { checkCondition } from "./conditionEngine.js";
import { applyEffects } from "./effectEngine.js";

export function getAvailableChoices(
    choices = []
) {

    return choices.filter(choice => {

        if (!choice.condition) {
            return true;
        }

        return checkCondition(
            choice.condition
        );
    });
}


export function choose(choice) {

    if (!choice) {
        return null;
    }

    /*
     * Aplicar consecuencias
     */

    applyEffects(
        choice.effects
    );

    /*
     * Ejecutar callback personalizado
     */

    if (
        typeof choice.onChoose ===
        "function"
    ) {
        choice.onChoose();
    }

    /*
     * Devolver destino
     */

    return {
        next: choice.next ?? null,

        action: choice.action ?? null,

        end: choice.end ?? false
    };
}
