import { gameState } from "./state.js";

export function addItem(item) {
    gameState.inventory.push({
        id: item.id,
        name: item.name,
        quantity: item.quantity ?? 1
    });
}

export function removeItem(id, quantity = 1) {
    const item = gameState.inventory.find(i => i.id === id);

    if (!item) return false;

    item.quantity -= quantity;

    if (item.quantity <= 0) {
        gameState.inventory =
            gameState.inventory.filter(i => i.id !== id);
    }

    return true;
}

export function hasItem(id) {
    return gameState.inventory.some(i => i.id === id);
}

export function getItem(id) {
    return gameState.inventory.find(i => i.id === id);
}
