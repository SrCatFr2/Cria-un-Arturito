"use strict";

import { checkCondition } from "./conditionEngine.js";
import {
    getAvailableChoices,
    choose
} from "./choiceEngine.js";

export class SceneEngine {

    constructor(options = {}) {

        this.dialogue =
            options.dialogue;

        this.scenes =
            options.scenes ?? {};

        this.onSceneStart =
            options.onSceneStart ??
            (() => {});

        this.onSceneEnd =
            options.onSceneEnd ??
            (() => {});

        this.onChoices =
            options.onChoices ??
            (() => {});

        this.onAction =
            options.onAction ??
            (() => {});

        this.onEnd =
            options.onEnd ??
            (() => {});


        this.currentScene = null;

        this.currentNode = null;

        this.waitingForChoice = false;
    }


    // =========================================
    // REGISTRAR ESCENAS
    // =========================================

    register(id, scene) {

        this.scenes[id] = scene;
    }


    // =========================================
    // IR A ESCENA
    // =========================================

    go(id) {

        const scene =
            this.scenes[id];

        if (!scene) {

            console.error(
                `Escena inexistente: ${id}`
            );

            return;
        }

        /*
         * Condición de escena
         */

        if (
            scene.condition &&
            !checkCondition(
                scene.condition
            )
        ) {

            if (scene.fallback) {

                this.go(
                    scene.fallback
                );

            }

            return;
        }


        this.currentScene = id;

        this.currentNode = null;

        this.waitingForChoice = false;

        this.onSceneStart(
            scene,
            id
        );


        /*
         * Buscar primer nodo
         */

        const start =
            scene.start ??
            scene.nodes?.[0];


        if (start) {

            this.showNode(start);

        } else {

            this.finishScene();
        }
    }


    // =========================================
    // MOSTRAR NODO
    // =========================================

    showNode(node) {

        this.currentNode = node;

        /*
         * Nodo puede ser string
         */

        if (typeof node === "string") {

            this.dialogue.start({
                speaker:
                    "ARTURITO",

                text: node
            });

            return;
        }


        /*
         * Nodo condicional
         */

        if (
            node.condition &&
            !checkCondition(
                node.condition
            )
        ) {

            if (node.fallback) {

                this.showNode(
                    node.fallback
                );

            } else {

                this.finishScene();
            }

            return;
        }


        /*
         * Nodo de acción
         */

        if (node.action) {

            this.onAction(
                node.action
            );
        }


        /*
         * Nodo de diálogo
         */

        if (
            node.speaker ||
            node.text
        ) {

            this.dialogue.start(node);

            return;
        }


        /*
         * Nodo de choices
         */

        if (node.choices) {

            this.showChoices(
                node.choices
            );

            return;
        }


        /*
         * Nodo vacío
         */

        this.advance();
    }


    // =========================================
    // TERMINÓ DIÁLOGO
    // =========================================

    advance() {

        const node =
            this.currentNode;

        if (!node) {
            return;
        }


        /*
         * Si tiene elecciones
         */

        if (node.choices) {

            this.showChoices(
                node.choices
            );

            return;
        }


        /*
         * Siguiente nodo
         */

        if (node.next) {

            this.showNode(
                node.next
            );

            return;
        }


        /*
         * Terminar escena
         */

        this.finishScene();
    }


    // =========================================
    // ELECCIONES
    // =========================================

    showChoices(choices) {

        const available =
            getAvailableChoices(
                choices
            );

        this.waitingForChoice = true;

        this.onChoices(
            available
        );
    }


    // =========================================
    // ELEGIR
    // =========================================

    selectChoice(index) {

        if (!this.waitingForChoice) {
            return;
        }

        const node =
            this.currentNode;

        const available =
            getAvailableChoices(
                node.choices ?? []
            );

        const choice =
            available[index];

        if (!choice) {
            return;
        }

        this.waitingForChoice = false;

        const result =
            choose(choice);

        /*
         * Acción
         */

        if (result.action) {

            this.onAction(
                result.action
            );
        }

        /*
         * Final
         */

        if (result.end) {

            this.onEnd();

            return;
        }

        /*
         * Siguiente escena
         */

        if (result.next) {

            /*
             * Si empieza por @ significa
             * que es un nodo de la escena actual.
             */

            if (
                result.next.startsWith("@")
            ) {

                this.showNode(
                    result.next.slice(1)
                );

            } else {

                this.go(
                    result.next
                );
            }

            return;
        }

        this.finishScene();
    }


    // =========================================
    // FIN
    // =========================================

    finishScene() {

        const scene =
            this.scenes[
                this.currentScene
            ];

        this.onSceneEnd(
            scene,
            this.currentScene
        );
    }
}
