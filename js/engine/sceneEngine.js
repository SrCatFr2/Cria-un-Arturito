import { DialogueEngine } from "./dialogueEngine.js";
import { ChoiceEngine } from "./choiceEngine.js";
import { checkCondition } from "./conditionEngine.js";
import { applyEffects } from "./effectEngine.js";

export class SceneEngine {

    constructor(options = {}) {

        this.scenes = options.scenes || {};
        this.currentScene = null;
        this.currentNode = null;
        this.currentNodeId = null;
        this.waitingForChoice = false;

        this.choiceEngine = new ChoiceEngine();

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

        this.callbacks = options;
    }


    register(id, scene) {
        this.scenes[id] = scene;
    }


    go(sceneId) {

        const scene = this.scenes[sceneId];

        if (!scene) {
            console.error(`Escena no encontrada: ${sceneId}`);
            return false;
        }

        if (scene.condition && !checkCondition(scene.condition)) {

            if (scene.fallback) {
                return this.go(scene.fallback);
            }

            return false;
        }

        this.currentScene = {
            id: sceneId,
            ...scene
        };

        this.waitingForChoice = false;

        this.callbacks.onSceneStart?.(
            this.currentScene,
            sceneId
        );

        const startId = scene.start;

        if (!startId) {
            console.error(`La escena "${sceneId}" no tiene start.`);
            return false;
        }

        return this.showNode(startId);
    }


    showNode(nodeId) {

        if (!this.currentScene) return false;

        const node = this.currentScene.nodes?.[nodeId];

        if (!node) {
            console.error(
                `Nodo "${nodeId}" no encontrado en "${this.currentScene.id}"`
            );
            return false;
        }

        if (
            node.condition &&
            !checkCondition(node.condition)
        ) {

            if (node.fallback) {
                return this.showNode(node.fallback);
            }

            return this.advanceFromNode(node);
        }

        this.currentNodeId = nodeId;
        this.currentNode = node;

        this.waitingForChoice = false;

        if (node.effects) {
            applyEffects(node.effects);
        }

        if (node.action) {
            this.callbacks.onAction?.(
                node.action,
                node
            );
        }

        if (node.dialogue) {

            this.dialogue.start(node.dialogue);

            return true;
        }

        if (node.choices) {
            return this.showChoices(node.choices);
        }

        if (node.end) {
            return this.finishScene();
        }

        return this.advanceFromNode(node);
    }


    advance() {

        if (!this.currentNode) return;

        // Si todavía se está escribiendo,
        // el primer click solo termina la escritura.
        if (this.dialogue.isTyping()) {
            this.dialogue.finishTyping();
            return;
        }

        if (this.waitingForChoice) {
            return;
        }

        this.advanceFromNode(this.currentNode);
    }


    advanceFromNode(node) {

        if (node.next) {

            const next = node.next;

            if (next.startsWith("@")) {
                return this.showNode(
                    next.substring(1)
                );
            }

            return this.go(next);
        }

        if (node.end) {
            return this.finishScene();
        }

        return this.finishScene();
    }


    showChoices(choices) {

        const available =
            this.choiceEngine.getAvailableChoices(choices);

        this.waitingForChoice = true;

        this.callbacks.onChoices?.(
            available,
            this.currentNode
        );

        return available;
    }


    selectChoice(index) {

        if (!this.waitingForChoice) return;

        const choices =
            this.choiceEngine.getAvailableChoices(
                this.currentNode.choices
            );

        const choice = choices[index];

        if (!choice) return;

        this.waitingForChoice = false;

        const result =
            this.choiceEngine.choose(choice);

        if (result.action) {
            this.callbacks.onAction?.(
                result.action,
                choice
            );
        }

        if (result.end) {
            return this.finishScene();
        }

        if (result.next) {

            if (result.next.startsWith("@")) {
                return this.showNode(
                    result.next.substring(1)
                );
            }

            return this.go(result.next);
        }
    }


    finishScene() {

        const scene = this.currentScene;

        this.callbacks.onSceneEnd?.(
            scene,
            scene?.id
        );

        this.currentScene = null;
        this.currentNode = null;
        this.currentNodeId = null;
        this.waitingForChoice = false;
    }
}
