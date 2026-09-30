import { gameState } from "./state.js";

export function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
}

export function changeStat(stat, amount) {
    if (!(stat in gameState.arturito)) return;

    gameState.arturito[stat] = clamp(
        gameState.arturito[stat] + amount
    );
}

export function changePlayerMoney(amount) {
    gameState.player.money += amount;

    if (amount < 0) {
        gameState.statistics.moneySpent += Math.abs(amount);
    } else {
        gameState.statistics.moneyEarned += amount;
    }
}

export function eat(amount = 20) {
    changeStat("hunger", amount);

    gameState.statistics.mealsGiven++;

    changeStat("happiness", 3);
}

export function makeHappy(amount = 10) {
    changeStat("happiness", amount);
}

export function makeSad(amount = 10) {
    changeStat("happiness", -amount);
}

export function improveIntelligence(amount = 5) {
    changeStat("intelligence", amount);

    gameState.school.knowledge = clamp(
        gameState.school.knowledge + amount
    );
}

export function modifyTrust(amount) {
    changeStat("trust", amount);
}

export function modifyConfidence(amount) {
    changeStat("confidence", amount);
}

export function insultArturito() {
    gameState.statistics.insultsReceived++;

    changeStat("happiness", -4);
    changeStat("trust", -2);

    gameState.arturito.relationship.annoyance =
        clamp(gameState.arturito.relationship.annoyance + 5);
}

export function advanceHunger() {
    changeStat("hunger", -7);

    if (gameState.arturito.hunger < 25) {
        changeStat("happiness", -5);
    }

    if (gameState.arturito.hunger <= 0) {
        changeStat("energy", -10);
        changeStat("happiness", -10);
    }
}
