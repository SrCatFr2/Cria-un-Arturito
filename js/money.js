import { gameState } from "./state.js";
import { changePlayerMoney } from "./stats.js";

export function canAfford(price) {
    return gameState.player.money >= price;
}

export function buy(price) {
    if (!canAfford(price)) {
        return false;
    }

    changePlayerMoney(-price);
    return true;
}

export function earn(amount) {
    changePlayerMoney(amount);
}

export function getMoney() {
    return gameState.player.money;
}
