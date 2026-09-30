"use strict";

import { DialogueEngine } from "./dialogueEngine.js";
import { SceneEngine } from "./sceneEngine.js";
import { updateMood } from "../character.js";
import { saveGame } from "../save.js";

export class GameEngine {

    constructor(options = {}) {

        this.scenes =
            options.scenes ?? {};

        /*
         * MOTOR DE DIÁLOGO
         */

        this.dialogue =
            new DialogueEngine({

                speed:
                    options.textSpeed ?? 25,

                onSpeaker:
                    options.onSpeaker,

                onText:
                    options.onText,

                onComplete:
                    () => {

                        this.scene.advance();
                    }
            });


        /*
         * MOTOR DE ESCENAS
         */

        this.scene =
            new SceneEngine({

                scenes:
                    this.scenes,

                dialogue:
                    this.dialogue,

                onSceneStart:
                    options.onSceneStart,

                onSceneEnd:
                    options.onSceneEnd,

                onChoices:
                    options.onChoices,

                onAction:
                    options.onAction,

                onEnd:
                    options.onEnd
            });
    }


    // =========================================
    // INICIAR
    // =========================================

    start(scene) {

        this.scene.go(scene);

        this.update();
    }


    // =========================================
    // ELECCIÓN
    // =========================================

    choose(index) {

        this.scene.selectChoice(
            index
        );

        this.update();
    }


    // =========================================
    // AVANZAR
    // =========================================

    advance() {

        if (
            this.dialogue.isTyping()
        ) {

            this.dialogue.advance();

            return;
        }

        this.scene.advance();

        this.update();
    }


    // =========================================
    // ACTUALIZAR
    // =========================================

    update() {

        updateMood();

        saveGame();
    }
}
