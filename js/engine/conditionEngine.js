"use strict";

import { gameState } from "../state.js";
import { hasItem } from "../inventory.js";

export function checkCondition(condition) {

    if (!condition) {
        return true;
    }

    // -----------------------------------------
    // TODAS
    // -----------------------------------------

    if (condition.all) {
        return condition.all.every(checkCondition);
    }

    // -----------------------------------------
    // ALGUNA
    // -----------------------------------------

    if (condition.any) {
        return condition.any.some(checkCondition);
    }

    // -----------------------------------------
    // NEGACIÓN
    // -----------------------------------------

    if (condition.not) {
        return !checkCondition(condition.not);
    }

    // -----------------------------------------
    // FLAG
    // -----------------------------------------

    if (condition.flag) {

        const value =
            gameState.flags[condition.flag];

        if ("equals" in condition) {
            return value === condition.equals;
        }

        return Boolean(value);
    }

    // -----------------------------------------
    // ESTADÍSTICA
    // -----------------------------------------

    if (condition.stat) {

        const value =
            getPath(condition.stat);

        return compare(
            value,
            condition.operator ?? ">=",
            condition.value
        );
    }

    // -----------------------------------------
    // DINERO
    // -----------------------------------------

    if (condition.money !== undefined) {

        return compare(
            gameState.player.money,
            condition.operator ?? ">=",
            condition.money
        );
    }

    // -----------------------------------------
    // EDAD
    // -----------------------------------------

    if (condition.age !== undefined) {

        return compare(
            gameState.arturito.age,
            condition.operator ?? "===",
            condition.age
        );
    }

    // -----------------------------------------
    // DÍA
    // -----------------------------------------

    if (condition.day !== undefined) {

        return compare(
            gameState.day,
            condition.operator ?? "===",
            condition.day
        );
    }

    // -----------------------------------------
    // OBJETO
    // -----------------------------------------

    if (condition.item) {

        return hasItem(condition.item);
    }

    // -----------------------------------------
    // UBICACIÓN
    // -----------------------------------------

    if (condition.location) {

        return gameState.location ===
            condition.location;
    }

    // -----------------------------------------
    // HORA / PERIODO
    // -----------------------------------------

    if (condition.period) {

        return gameState.time.period ===
            condition.period;
    }

    return true;
}


// =====================================================
// OBTENER PROPIEDAD PROFUNDA
// =====================================================

function getPath(path) {

    const parts = path.split(".");

    let current = gameState;

    for (const part of parts) {

        if (
            current === undefined ||
            current === null
        ) {
            return undefined;
        }

        current = current[part];
    }

    return current;
}


// =====================================================
// COMPARADORES
// =====================================================

function compare(
    current,
    operator,
    target
) {

    switch (operator) {

        case ">":
            return current > target;

        case ">=":
            return current >= target;

        case "<":
            return current < target;

        case "<=":
            return current <= target;

        case "===":
        case "==":
            return current === target;

        case "!==":
        case "!=":
            return current !== target;

        default:
            return false;
    }
}
