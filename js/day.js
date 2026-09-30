import { gameState } from "./state.js";
import { advanceHunger } from "./stats.js";
import { updateMood } from "./character.js";
import { processDailyEvents } from "./events.js";

const periods = [
    {
        id: "morning",
        hour: 8
    },
    {
        id: "afternoon",
        hour: 14
    },
    {
        id: "evening",
        hour: 19
    },
    {
        id: "night",
        hour: 23
    }
];

export function getCurrentPeriod() {
    return gameState.time.period;
}

export function advanceTime() {
    const index = periods.findIndex(
        p => p.id === gameState.time.period
    );

    const next = index + 1;

    if (next >= periods.length) {
        nextDay();
        return;
    }

    gameState.time.period = periods[next].id;
    gameState.time.hour = periods[next].hour;

    updateMood();
}

export function nextDay() {
    gameState.day++;

    gameState.time.period = "morning";
    gameState.time.hour = 8;
    gameState.time.minute = 0;

    advanceHunger();

    gameState.statistics.daysCompleted++;

    processDailyEvents();

    updateMood();

    checkAge();
}

function checkAge() {
    if (gameState.day % 30 === 0) {
        gameState.arturito.age++;
        gameState.year++;

        gameState.arturito.energy = 80;
    }
}

export function isNight() {
    return gameState.time.period === "night";
}
