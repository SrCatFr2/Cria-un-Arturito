"use strict";

import { gameState } from "./state.js";
import {
    saveGame,
    loadGame,
    hasSave,
    deleteSave
} from "./save.js";

import { actions } from "./actions.js";
import { scenes } from "./scenes.js";
import { updateMood } from "./character.js";
import { getAvailableChoices } from "./dialogue.js";
import { calculateEnding, endings } from "./endings.js";


// =====================================================
// ELEMENTOS DEL HTML
// =====================================================

const $ = (id) => document.getElementById(id);

const background = $("background");
const character = $("character");
const characterSprite = $("character-sprite");
const characterPlaceholder = $("character-placeholder");

const speaker = $("speaker");
const dialogueText = $("dialogue-text");
const choicesContainer = $("choices");
const continueButton = $("continue-button");

const dayElement = $("day");
const timeElement = $("time");
const moneyElement = $("money");

const ageElement = $("age-display");

const hungerValue = $("hunger-value");
const happinessValue = $("happiness-value");
const energyValue = $("energy-value");

const hungerBar = $("hunger-bar");
const happinessBar = $("happiness-bar");
const energyBar = $("energy-bar");

const intelligenceValue = $("intelligence-value");
const confidenceValue = $("confidence-value");
const nerdValue = $("nerd-value");
const trustValue = $("trust-value");

const affectionValue = $("affection-value");
const respectValue = $("respect-value");
const annoyanceValue = $("annoyance-value");

const moodElement = $("mood");

const menuButton = $("menu-button");
const menuOverlay = $("menu-overlay");
const closeMenuButton = $("close-menu-button");

const saveButton = $("save-button");

const inventoryButton = $("inventory-button");
const inventoryOverlay = $("inventory-overlay");
const inventoryList = $("inventory-list");
const closeInventoryButton = $("close-inventory-button");

const endingScreen = $("ending-screen");
const endingTitle = $("ending-title");
const endingText = $("ending-text");
const restartButton = $("restart-button");


// =====================================================
// ESTADO INTERNO DEL MOTOR
// =====================================================

let currentScene = null;
let dialogueFinished = false;
let typingTimer = null;
let isTyping = false;

let currentText = "";

const TEXT_SPEED = 22;


// =====================================================
// INICIO
// =====================================================

function init() {

    setupButtons();

    updateMood();

    updateUI();

    /*
     * Si existe partida, la cargamos.
     * Si no, empezamos una nueva.
     */

    if (hasSave()) {

        const loaded = loadGame();

        if (loaded && gameState.started) {
            startSavedGame();
            return;
        }
    }

    startNewGame();
}


// =====================================================
// NUEVA PARTIDA
// =====================================================

function startNewGame() {

    gameState.started = true;
    gameState.finished = false;

    gameState.day = 1;

    gameState.time.period = "morning";
    gameState.time.hour = 8;
    gameState.time.minute = 0;

    gameState.location = "house";

    updateMood();
    updateUI();

    /*
     * Primer escena jugable.
     */

    showScene("talk");

    saveGame();
}


// =====================================================
// CARGAR PARTIDA
// =====================================================

function startSavedGame() {

    updateMood();
    updateUI();

    if (gameState.finished) {
        showEnding();
        return;
    }

    /*
     * Si había un evento/escena guardada,
     * por ahora retomamos desde una escena básica.
     */

    showScene("talk");
}


// =====================================================
// ESCENAS
// =====================================================

function showScene(sceneId) {

    const scene = scenes[sceneId];

    if (!scene) {

        console.warn(
            `La escena "${sceneId}" no existe.`
        );

        showFallbackScene();

        return;
    }

    currentScene = sceneId;

    dialogueFinished = false;

    clearChoices();

    /*
     * Animación
     */

    const dialogueBox = $("dialogue-box");

    if (dialogueBox) {
        dialogueBox.classList.remove("dialogue-enter");

        void dialogueBox.offsetWidth;

        dialogueBox.classList.add("dialogue-enter");
    }

    /*
     * Personaje
     */

    if (character) {

        character.classList.remove("character-enter");

        void character.offsetWidth;

        character.classList.add("character-enter");
    }

    /*
     * Datos de escena
     */

    speaker.textContent =
        scene.speaker || "ARTURITO";

    setDialogue(scene.text || "...");

    /*
     * Decisiones
     */

    const availableChoices =
        getAvailableChoices(scene.choices || []);

    if (availableChoices.length > 0) {

        continueButton.style.display = "none";

        renderChoices(availableChoices);

    } else {

        continueButton.style.display = "block";
    }

    updateUI();
}


// =====================================================
// TEXTO CON EFECTO DE ESCRITURA
// =====================================================

function setDialogue(text) {

    clearInterval(typingTimer);

    currentText = text;

    dialogueText.textContent = "";

    isTyping = true;

    let index = 0;

    typingTimer = setInterval(() => {

        dialogueText.textContent =
            currentText.slice(0, index + 1);

        index++;

        if (index >= currentText.length) {

            clearInterval(typingTimer);

            isTyping = false;

            dialogueFinished = true;
        }

    }, TEXT_SPEED);
}


// =====================================================
// CONTINUAR
// =====================================================

function continueDialogue() {

    /*
     * Si todavía se está escribiendo,
     * mostrar inmediatamente todo.
     */

    if (isTyping) {

        clearInterval(typingTimer);

        dialogueText.textContent = currentText;

        isTyping = false;

        dialogueFinished = true;

        return;
    }

    if (!dialogueFinished) {
        return;
    }

    /*
     * Si la escena tenía choices,
     * no debería poder llegar aquí.
     */

    const scene = scenes[currentScene];

    if (!scene) {
        return;
    }

    /*
     * Si existe siguiente escena.
     */

    if (scene.next) {

        showScene(scene.next);

        return;
    }

    /*
     * Si no existe siguiente escena,
     * avanzamos el tiempo.
     */

    finishScene();
}


// =====================================================
// DECISIONES
// =====================================================

function renderChoices(choices) {

    clearChoices();

    choices.forEach((choice) => {

        const button =
            document.createElement("button");

        button.className = "choice-button";

        button.textContent = choice.text;

        button.addEventListener(
            "click",
            () => choose(choice)
        );

        choicesContainer.appendChild(button);
    });
}


function choose(choice) {

    /*
     * Aplicar efectos de la decisión
     */

    if (choice.effects) {
        applyChoiceEffects(choice.effects);
    }

    /*
     * Flags
     */

    if (choice.setFlag) {

        gameState.flags[choice.setFlag] = true;
    }

    /*
     * Siguiente escena
     */

    if (choice.next) {

        showScene(choice.next);

    } else {

        finishScene();
    }

    updateMood();
    updateUI();

    saveGame();
}


// =====================================================
// EFECTOS DE DECISIONES
// =====================================================

function applyChoiceEffects(effects) {

    for (const effect of effects) {

        if (!effect.target) continue;

        const parts =
            effect.target.split(".");

        let target = gameState;

        for (
            let i = 0;
            i < parts.length - 1;
            i++
        ) {

            if (!target[parts[i]]) {
                target = null;
                break;
            }

            target = target[parts[i]];
        }

        if (!target) continue;

        const property =
            parts[parts.length - 1];

        if (
            typeof target[property] === "number"
        ) {

            target[property] +=
                effect.amount || 0;

            /*
             * Mantener stats entre 0 y 100
             */

            if (effect.clamp !== false) {

                target[property] =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            target[property]
                        )
                    );
            }
        }
    }
}


// =====================================================
// TERMINAR ESCENA
// =====================================================

function finishScene() {

    clearChoices();

    continueButton.style.display = "block";

    /*
     * Si estamos en la noche,
     * el siguiente paso será otro día.
     *
     * Por ahora avanzamos mediante la acción
     * correspondiente cuando sea necesario.
     */

    dialogueText.textContent =
        "¿Qué quieres hacer ahora?";

    speaker.textContent =
        "ARTURITO";

    dialogueFinished = true;

    updateUI();

    saveGame();
}


// =====================================================
// ESCENA FALLBACK
// =====================================================

function showFallbackScene() {

    currentScene = null;

    speaker.textContent = "ARTURITO";

    setDialogue(
        "No sé qué se supone que está pasando."
    );

    clearChoices();

    continueButton.style.display = "block";
}


// =====================================================
// LIMPIAR OPCIONES
// =====================================================

function clearChoices() {

    choicesContainer.innerHTML = "";
}


// =====================================================
// ACTUALIZAR TODO EL HUD
// =====================================================

function updateUI() {

    const a = gameState.arturito;

    /*
     * Día
     */

    dayElement.textContent =
        gameState.day;


    /*
     * Hora
     */

    const hour =
        String(gameState.time.hour)
            .padStart(2, "0");

    const minute =
        String(gameState.time.minute)
            .padStart(2, "0");

    timeElement.textContent =
        `${hour}:${minute}`;


    /*
     * Dinero
     */

    moneyElement.textContent =
        gameState.player.money;


    /*
     * Edad
     */

    ageElement.textContent =
        `${a.age} AÑOS`;


    /*
     * Stats
     */

    hungerValue.textContent =
        Math.round(a.hunger);

    happinessValue.textContent =
        Math.round(a.happiness);

    energyValue.textContent =
        Math.round(a.energy);

    intelligenceValue.textContent =
        Math.round(a.intelligence);

    confidenceValue.textContent =
        Math.round(a.confidence);

    nerdValue.textContent =
        Math.round(a.nerd);

    trustValue.textContent =
        Math.round(a.trust);


    /*
     * Relaciones
     */

    affectionValue.textContent =
        Math.round(
            a.relationship.affection
        );

    respectValue.textContent =
        Math.round(
            a.relationship.respect
        );

    annoyanceValue.textContent =
        Math.round(
            a.relationship.annoyance
        );


    /*
     * Barras
     */

    hungerBar.style.width =
        `${clamp(a.hunger)}%`;

    happinessBar.style.width =
        `${clamp(a.happiness)}%`;

    energyBar.style.width =
        `${clamp(a.energy)}%`;


    /*
     * Estado de ánimo
     */

    moodElement.textContent =
        getMoodName(a.currentMood);
}


// =====================================================
// NOMBRE DEL ESTADO DE ÁNIMO
// =====================================================

function getMoodName(mood) {

    const moods = {

        normal: "NORMAL",

        hungry: "HAMBRIENTO",

        sad: "TRISTE",

        confident_idiot:
            "DEMASIADO SEGURO DE SÍ MISMO",

        nerdy: "NERD",

        distant: "DISTANTE",

        happy: "FELIZ"
    };

    return moods[mood] || "NORMAL";
}


// =====================================================
// CLAMP
// =====================================================

function clamp(value) {

    return Math.max(
        0,
        Math.min(
            100,
            value
        )
    );
}


// =====================================================
// MENÚ
// =====================================================

function openMenu() {

    menuOverlay.classList.remove("hidden");
}

function closeMenu() {

    menuOverlay.classList.add("hidden");
}


// =====================================================
// INVENTARIO
// =====================================================

function openInventory() {

    renderInventory();

    inventoryOverlay.classList.remove("hidden");
}

function closeInventory() {

    inventoryOverlay.classList.add("hidden");
}


function renderInventory() {

    inventoryList.innerHTML = "";

    if (
        !gameState.inventory ||
        gameState.inventory.length === 0
    ) {

        inventoryList.innerHTML = `
            <div class="empty-inventory">
                No tienes objetos.
            </div>
        `;

        return;
    }

    gameState.inventory.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "inventory-item";

        element.innerHTML = `
            <span>${escapeHTML(item.name)}</span>
            <strong>x${item.quantity}</strong>
        `;

        inventoryList.appendChild(element);
    });
}


// =====================================================
// GUARDAR
// =====================================================

function saveCurrentGame() {

    saveGame();

    /*
     * Pequeña confirmación visual.
     */

    const oldText =
        saveButton.textContent;

    saveButton.textContent =
        "PARTIDA GUARDADA";

    setTimeout(() => {

        saveButton.textContent =
            oldText;

    }, 1200);
}


// =====================================================
// FINAL
// =====================================================

function showEnding() {

    const endingId =
        calculateEnding();

    const ending =
        endings[endingId];

    if (!ending) {
        return;
    }

    gameState.finished = true;

    endingTitle.textContent =
        ending.title;

    endingText.textContent =
        ending.text;

    endingScreen.classList.remove("hidden");

    saveGame();
}


// =====================================================
// REINICIAR
// =====================================================

function restartGame() {

    deleteSave();

    /*
     * Recargar la página hace que todos los
     * módulos vuelvan a crear el estado inicial.
     */

    window.location.reload();
}


// =====================================================
// BOTONES
// =====================================================

function setupButtons() {

    /*
     * Diálogo
     */

    continueButton.addEventListener(
        "click",
        continueDialogue
    );


    /*
     * Menú
     */

    menuButton.addEventListener(
        "click",
        openMenu
    );

    closeMenuButton.addEventListener(
        "click",
        closeMenu
    );


    /*
     * Guardar
     */

    saveButton.addEventListener(
        "click",
        saveCurrentGame
    );


    /*
     * Inventario
     */

    inventoryButton.addEventListener(
        "click",
        openInventory
    );

    closeInventoryButton.addEventListener(
        "click",
        closeInventory
    );


    /*
     * Reiniciar
     */

    restartButton.addEventListener(
        "click",
        restartGame
    );


    /*
     * Acciones rápidas
     */

    document
        .querySelectorAll("[data-action]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;

                    performAction(action);
                }
            );
        });


    /*
     * Clic en la caja:
     * si está escribiendo, termina el texto.
     */

    dialogueText.addEventListener(
        "click",
        () => {

            if (isTyping) {
                continueDialogue();
            }
        }
    );


    /*
     * Teclado
     */

    document.addEventListener(
        "keydown",
        handleKeyboard
    );
}


// =====================================================
// ACCIONES DEL JUEGO
// =====================================================

function performAction(actionName, ...args) {

    const action =
        actions[actionName];

    if (!action) {

        console.warn(
            `Acción desconocida: ${actionName}`
        );

        return;
    }

    /*
     * Ejecutar acción
     */

    const result =
        action(...args);

    /*
     * Acción fallida
     */

    if (result?.error) {

        showTemporaryMessage(
            result.error
        );

        return;
    }

    /*
     * Acción devuelve escena
     */

    if (result?.scene) {

        showScene(result.scene);

    } else {

        updateMood();
        updateUI();
    }

    saveGame();
}


// =====================================================
// MENSAJE TEMPORAL
// =====================================================

function showTemporaryMessage(message) {

    const oldText =
        dialogueText.textContent;

    const oldSpeaker =
        speaker.textContent;

    speaker.textContent =
        "SISTEMA";

    dialogueText.textContent =
        message;

    setTimeout(() => {

        speaker.textContent =
            oldSpeaker;

        dialogueText.textContent =
            oldText;

    }, 1600);
}


// =====================================================
// TECLADO
// =====================================================

function handleKeyboard(event) {

    /*
     * ENTER / ESPACIO
     */

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        /*
         * No interferir con botones
         */

        if (
            document.activeElement?.tagName ===
            "BUTTON"
        ) {
            return;
        }

        continueDialogue();
    }


    /*
     * ESC
     */

    if (event.key === "Escape") {

        if (
            !menuOverlay.classList.contains("hidden")
        ) {

            closeMenu();

        } else {

            openMenu();
        }
    }
}


// =====================================================
// ESCAPAR HTML
// =====================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// =====================================================
// EXPONER MOTOR
// =====================================================

window.ArturitoGame = {

    startNewGame,

    startSavedGame,

    showScene,

    performAction,

    updateUI,

    saveGame,

    showEnding,

    getState: () => gameState
};


// =====================================================
// ARRANCAR
// =====================================================

init();
