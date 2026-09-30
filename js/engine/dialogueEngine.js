"use strict";

export class DialogueEngine {

    constructor(options = {}) {

        this.speed =
            options.speed ?? 25;

        this.onSpeaker =
            options.onSpeaker ?? (() => {});

        this.onText =
            options.onText ?? (() => {});

        this.onComplete =
            options.onComplete ?? (() => {});

        this.onChoice =
            options.onChoice ?? (() => {});

        this.onStart =
            options.onStart ?? (() => {});


        this.currentText = "";

        this.index = 0;

        this.typing = false;

        this.timer = null;
    }


    // =========================================
    // INICIAR DIÁLOGO
    // =========================================

    start(dialogue) {

        this.stop();

        if (!dialogue) {
            return;
        }

        this.currentText =
            dialogue.text ?? "";

        this.index = 0;

        this.typing = true;

        this.onStart(dialogue);

        this.onSpeaker(
            dialogue.speaker ??
            "ARTURITO"
        );

        this.type();
    }


    // =========================================
    // ESCRIBIR
    // =========================================

    type() {

        this.timer =
            setInterval(() => {

                this.index++;

                this.onText(
                    this.currentText
                        .slice(
                            0,
                            this.index
                        )
                );

                if (
                    this.index >=
                    this.currentText.length
                ) {

                    this.finishTyping();
                }

            }, this.speed);
    }


    // =========================================
    // TERMINAR ESCRITURA
    // =========================================

    finishTyping() {

        this.stop();

        this.typing = false;

        this.onText(
            this.currentText
        );

        this.onComplete();
    }


    // =========================================
    // CLICK / ENTER
    // =========================================

    advance() {

        if (this.typing) {

            this.finishTyping();

            return true;
        }

        return false;
    }


    // =========================================
    // DETENER
    // =========================================

    stop() {

        if (this.timer) {

            clearInterval(
                this.timer
            );

            this.timer = null;
        }
    }


    // =========================================
    // ESTADO
    // =========================================

    isTyping() {

        return this.typing;
    }
}
