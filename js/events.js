import { gameState } from "./state.js";
import { startExam } from "./school.js";
import { changeStat, modifyTrust } from "./stats.js";

export function processDailyEvents() {

    if (gameState.day === 2) {
        triggerEvent("first_school_problem");
    }

    if (gameState.day === 4) {
        triggerEvent("math_exam");
    }

    if (gameState.day % 7 === 0) {
        triggerRandomEvent();
    }
}

export function triggerEvent(id) {

    if (gameState.completedEvents.includes(id)) {
        return false;
    }

    gameState.activeEvents.push(id);

    return true;
}

export function completeEvent(id) {

    if (!gameState.completedEvents.includes(id)) {
        gameState.completedEvents.push(id);
    }

    gameState.activeEvents =
        gameState.activeEvents.filter(event => event !== id);
}

export function triggerRandomEvent() {

    const events = [
        "lost_money",
        "weird_question",
        "arturito_linux",
        "unexpected_guest"
    ];

    const event =
        events[Math.floor(Math.random() * events.length)];

    triggerEvent(event);
}

export function resolveEvent(id, choice) {

    switch (id) {

        case "first_school_problem":

            if (choice === "help") {
                modifyTrust(8);
                changeStat("happiness", 5);
            }

            if (choice === "ignore") {
                modifyTrust(-5);
            }

            completeEvent(id);
            break;

        case "math_exam":

            const result = startExam("math");

            completeEvent(id);

            return result;

        case "lost_money":

            if (choice === "search") {
                gameState.player.money += 10;
            }

            completeEvent(id);
            break;

        case "weird_question":

            changeStat("intelligence", 2);
            completeEvent(id);
            break;

        case "arturito_linux":

            gameState.arturito.nerd += 15;
            gameState.arturito.happiness += 10;

            completeEvent(id);
            break;

        case "unexpected_guest":

            modifyTrust(2);

            completeEvent(id);
            break;
    }
}
