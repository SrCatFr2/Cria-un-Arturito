import { DialogueEngine } from "./dialogueEngine.js";
import { SceneEngine } from "./sceneEngine.js";
import { scenes } from "../scenes.js";

export class GameEngine {

    constructor(options = {}) {

        this.dialogue = new DialogueEngine({
            speed: options.speed || 25,

            onSpeaker: speaker => {
                options.onSpeaker?.(speaker);
            },

            onText: text => {
                options.onText?.(text);
            },

            onComplete: () => {
                options.onDialogueComplete?.();
            }
        });

        this.scene = new SceneEngine({

            scenes,

            speed: options.speed || 25,

            onSpeaker: speaker => {
                options.onSpeaker?.(speaker);
            },

            onText: text => {
                options.onText?.(text);
            },

            onChoices: (choices, node) => {
                options.onChoices?.(choices, node);
            },

            onAction: (action, data) => {
                options.onAction?.(action, data);
            },

            onSceneStart: (scene, id) => {
                options.onSceneStart?.(scene, id);
            },

            onSceneEnd: (scene, id) => {
                options.onSceneEnd?.(scene, id);
            }
        });
    }


    start(sceneId) {
        return this.scene.go(sceneId);
    }


    advance() {
        this.scene.advance();
    }


    choose(index) {
        this.scene.selectChoice(index);
    }
}
