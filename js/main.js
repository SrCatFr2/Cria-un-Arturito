"use strict";

import { gameState } from "./state.js";
import { scenes } from "./scenes.js";
import { hasSave, loadGame, saveGame } from "./save.js";

import { GameEngine } from "./engine/gameEngine.js";


// =====================================================
// ELEMENTOS
// =====================================================

const $ = id =>
    document.getElementById(id);

const speaker =
    $("speaker");

const dialogueText =
    $("dialogue-text");

const choices =
    $("choices");

const continueButton =
    $("continue-button");

const day =
    $("day");

const time =
    $("time");

const money =
    $("money");

const age =
    $("age-display");

const mood =
    $("mood");

const hungerValue =
    $("hunger-value");

const happinessValue =
    $("happiness-value");

const energyValue =
    $("energy-value");

const hungerBar =
    $("hunger-bar");

const happinessBar =
    $("happiness-bar");

const energyBar =
    $("energy-bar");

const intelligence =
    $("intelligence-value");

const confidence =
    $("confidence-value");

const nerd =
    $("nerd-value");

const trust =
    $("trust-value");

const affection =
    $("affection-value");

const respect =
    $("respect-value");

const annoyance =
    $("annoyance-value");


// =====================================================
// MOTOR
// =====================================================

const engine =
    new GameEngine({

        scenes,

        textSpeed: 22,

        onSpeaker(name) {

            speaker.textContent =
                name;
        },

        onText(text) {

            dialogueText.textContent =
                text;
        },

        onChoices(list) {

            renderChoices(list);
        },

        onSceneStart(scene) {

            choices.innerHTML = "";

            continueButton.style.display =
                "none";

            updateUI();
        },

        onSceneEnd() {

            choices.innerHTML = "";

            continueButton.style.display =
                "block";

            updateUI();
        },

        onAction(action) {

            console.log(
                "Acción:",
                action
            );

            updateUI();
        },

        onEnd() {

            console.log(
                "Juego terminado"
            );
        }
    });


// =====================================================
// ELECCIONES
// =====================================================

function renderChoices(list) {

    choices.innerHTML = "";

    continueButton.style.display =
        "none";

    list.forEach(
        (choice, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "choice-button";

            button.textContent =
                choice.text;

            button.addEventListener(
                "click",
                () => {

                    choices.innerHTML = "";

                    engine.choose(index);
                }
            );

            choices.appendChild(
                button
            );
        }
    );
}


// =====================================================
// CONTINUAR
// =====================================================

continueButton.addEventListener(
    "click",
    () => {

        engine.advance();
    }
);


// =====================================================
// HUD
// =====================================================

function updateUI() {

    const a =
        gameState.arturito;


    day.textContent =
        gameState.day;


    time.textContent =
        `${String(gameState.time.hour)
            .padStart(2, "0")}:${String(gameState.time.minute)
            .padStart(2, "0")}`;


    money.textContent =
        gameState.player.money;


    age.textContent =
        `${a.age} AÑOS`;


    hungerValue.textContent =
        Math.round(a.hunger);

    happinessValue.textContent =
        Math.round(a.happiness);

    energyValue.textContent =
        Math.round(a.energy);


    hungerBar.style.width =
        `${a.hunger}%`;

    happinessBar.style.width =
        `${a.happiness}%`;

    energyBar.style.width =
        `${a.energy}%`;


    intelligence.textContent =
        Math.round(a.intelligence);

    confidence.textContent =
        Math.round(a.confidence);

    nerd.textContent =
        Math.round(a.nerd);

    trust.textContent =
        Math.round(a.trust);


    affection.textContent =
        Math.round(
            a.relationship.affection
        );

    respect.textContent =
        Math.round(
            a.relationship.respect
        );

    annoyance.textContent =
        Math.round(
            a.relationship.annoyance
        );


    mood.textContent =
        getMoodName(
            a.currentMood
        );
}


// =====================================================
// MOOD
// =====================================================

function getMoodName(value) {

    const names = {

        normal: "NORMAL",

        hungry: "HAMBRIENTO",

        sad: "TRISTE",

        confident_idiot:
            "DEMASIADO SEGURO",

        nerdy: "NERD",

        distant: "DISTANTE",

        happy: "FELIZ"
    };

    return names[value] ??
        "NORMAL";
}


// =====================================================
// ARRANQUE
// =====================================================

function start() {

    if (
        hasSave() &&
        loadGame() &&
        gameState.started
    ) {

        updateUI();

        engine.start(
            "talk"
        );

        return;
    }


    gameState.started =
        true;

    saveGame();

    updateUI();

    engine.start(
        "talk"
    );
}


start();


// =====================================================
// API GLOBAL
// =====================================================

window.ArturitoGame = {

    engine,

    state:
        gameState,

    scene(id) {

        engine.scene.go(id);
    },

    choose(index) {

        engine.choose(index);
    },

    advance() {

        engine.advance();
    },

    update() {

        updateUI();
    }
};
