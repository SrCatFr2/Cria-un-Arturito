import { gameState } from "./state.js";
import {
    eat,
    makeHappy,
    improveIntelligence,
    modifyTrust,
    changeStat,
    insultArturito
} from "./stats.js";

import { buy } from "./money.js";
import { study, attendSchool } from "./school.js";
import { addItem } from "./inventory.js";
import { advanceTime } from "./day.js";

export const actions = {

    breakfast() {
        eat(25);
        makeHappy(5);

        advanceTime();

        return {
            scene: "breakfast"
        };
    },

    cheapBreakfast() {
        if (!buy(5)) {
            return {
                error: "No tienes suficiente dinero."
            };
        }

        eat(18);
        makeHappy(2);

        advanceTime();

        return {
            scene: "cheap_breakfast"
        };
    },

    ignoreFood() {
        changeStat("hunger", -15);
        changeStat("happiness", -5);

        gameState.statistics.timesIgnored++;

        advanceTime();

        return {
            scene: "ignored_food"
        };
    },

    talk() {
        modifyTrust(3);

        gameState.statistics.conversations++;

        return {
            scene: "talk"
        };
    },

    play() {
        changeStat("happiness", 15);
        changeStat("energy", -10);

        gameState.statistics.gamesPlayed++;

        advanceTime();

        return {
            scene: "play"
        };
    },

    study() {
        study("computing", 30);

        changeStat("happiness", -3);

        advanceTime();

        return {
            scene: "study"
        };
    },

    school() {
        attendSchool();

        advanceTime();

        return {
            scene: "school"
        };
    },

    insult() {
        insultArturito();

        gameState.statistics.arguments++;

        return {
            scene: "insult"
        };
    },

    giveMoney(amount) {
        if (!buy(amount)) {
            return {
                error: "No tienes suficiente dinero."
            };
        }

        changeStat("happiness", 5);
        modifyTrust(2);

        return {
            scene: "gave_money"
        };
    },

    buyComputer() {
        if (!buy(80)) {
            return {
                error: "No tienes suficiente dinero."
            };
        }

        addItem({
            id: "old_computer",
            name: "Computadora vieja"
        });

        gameState.arturito.nerd += 10;

        return {
            scene: "computer"
        };
    }
};
