"use strict";

import { gameState } from "../state.js";
import { addItem, removeItem } from "../inventory.js";

export function applyEffects(effects = []) {

    for (const effect of effects) {

        applyEffect(effect);
    }
}


function applyEffect(effect) {

    if (!effect) {
        return;
    }


    // =========================================
    // CAMBIAR VARIABLE
    // =========================================

    if (effect.set) {

        setPath(
            effect.set,
            effect.value
        );

        return;
    }


    // =========================================
    // SUMAR / RESTAR
    // =========================================

    if (effect.change) {

        changePath(
            effect.change,
            effect.amount ?? 0,
            effect.min,
            effect.max
        );

        return;
    }


    // =========================================
    // FLAG
    // =========================================

    if (effect.flag) {

        gameState.flags[effect.flag] =
            effect.value ?? true;

        return;
    }


    // =========================================
    // DAR OBJETO
    // =========================================

    if (effect.addItem) {

        addItem(effect.addItem);

        return;
    }


    // =========================================
    // QUITAR OBJETO
    // =========================================

    if (effect.removeItem) {

        removeItem(
            effect.removeItem,
            effect.quantity ?? 1
        );

        return;
    }


    // =========================================
    // DINERO
    // =========================================

    if (effect.money !== undefined) {

        gameState.player.money +=
            effect.money;

        return;
    }


    // =========================================
    // UBICACIÓN
    // =========================================

    if (effect.location) {

        gameState.location =
            effect.location;

        return;
    }


    // =========================================
    // PERIODO
    // =========================================

    if (effect.period) {

        gameState.time.period =
            effect.period;

        return;
    }


    // =========================================
    // HORA
    // =========================================

    if (effect.time) {

        if (
            effect.time.hour !== undefined
        ) {
            gameState.time.hour =
                effect.time.hour;
        }

        if (
            effect.time.minute !== undefined
        ) {
            gameState.time.minute =
                effect.time.minute;
        }

        return;
    }
}


// =====================================================
// SET
// =====================================================

function setPath(path, value) {

    const parts = path.split(".");

    let target = gameState;

    for (
        let i = 0;
        i < parts.length - 1;
        i++
    ) {

        if (!target[parts[i]]) {
            target[parts[i]] = {};
        }

        target = target[parts[i]];
    }

    target[parts.at(-1)] = value;
}


// =====================================================
// CHANGE
// =====================================================

function changePath(
    path,
    amount,
    min,
    max
) {

    const current =
        getPath(path);

    if (typeof current !== "number") {
        return;
    }

    let value =
        current + amount;

    if (min !== undefined) {
        value = Math.max(min, value);
    }

    if (max !== undefined) {
        value = Math.min(max, value);
    }

    setPath(path, value);
}


function getPath(path) {

    const parts = path.split(".");

    let current = gameState;

    for (const part of parts) {

        current = current?.[part];
    }

    return current;
}
