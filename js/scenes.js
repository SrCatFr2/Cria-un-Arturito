import { gameState } from "./state.js";
import { showDialogue, showChoices } from "./dialogue.js";
import { saveGame } from "./save.js";
import { updateStats } from "./main.js";


export function startPrologue() {

    showDialogue(
        "",
        "Algo ha tocado tu puerta.",
        () => {

            showDialogue(
                "",
                "TOC. TOC. TOC.",
                () => {

                    showDialogue(
                        "",
                        "Miras el reloj. Son las 02:17 AM.",
                        () => {

                            showDialogue(
                                "",
                                "Vuelves a escuchar el golpe.",
                                () => {

                                    showDialogue(
                                        "",
                                        "TOC. TOC.",
                                        () => {

                                            openDoor();

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

}


function openDoor() {

    showDialogue(
        "",
        "Abres la puerta.",
        () => {

            showDialogue(
                "",
                "Hay una pequeña caja frente a tu casa.",
                () => {

                    showDialogue(
                        "",
                        "Dentro hay un bebé.",
                        () => {

                            showDialogue(
                                "",
                                "Junto al bebé hay una nota.",
                                () => {

                                    showDialogue(
                                        "",
                                        "\"Se llama Arturito.\"",
                                        () => {

                                            meetBaby();

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

}


function meetBaby() {

    showDialogue(
        "Tú",
        "...¿Arturito?",
        () => {

            showDialogue(
                "Arturito",
                "Gugugu.",
                () => {

                    showDialogue(
                        "",
                        "El bebé te mira fijamente.",
                        () => {

                            showChoices([

                                {
                                    text: "Recogerlo",

                                    action: () => {

                                        timeSkip();

                                    }
                                },

                                {
                                    text: "Mirar la nota otra vez",

                                    action: () => {

                                        showDialogue(
                                            "",
                                            "La nota solamente dice: \"Se llama Arturito.\"",
                                            () => meetBaby()
                                        );

                                    }
                                }

                            ]);

                        }
                    );

                }
            );

        }
    );

}


function timeSkip() {

    showDialogue(
        "",
        "No sabes exactamente cómo ocurrió.",
        () => {

            showDialogue(
                "",
                "Pero ocho años después...",
                () => {

                    gameState.started = true;

                    gameState.age = 8;

                    gameState.scene = "kitchen";

                    saveGame();

                    updateStats();

                    firstMorning();

                }
            );

        }
    );

}


function firstMorning() {

    showDialogue(
        "Arturito",
        "¡YA DESPERTÉ!",
        () => {

            showDialogue(
                "Tú",
                "¿Qué estás haciendo?",
                () => {

                    showDialogue(
                        "Arturito",
                        "Estoy pensando.",
                        () => {

                            showDialogue(
                                "Tú",
                                "¿En qué?",
                                () => {

                                    showDialogue(
                                        "Arturito",
                                        "No sé.",
                                        () => {

                                            showDialogue(
                                                "",
                                                "Arturito lleva aproximadamente veinte minutos mirando una cuchara.",
                                                () => {

                                                    firstChoice();

                                                }
                                            );

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

}


function firstChoice() {

    showChoices([

        {
            text: "Preguntarle qué hace",

            action: () => {

                showDialogue(
                    "Tú",
                    "¿Por qué estás mirando la cuchara?",
                    () => {

                        showDialogue(
                            "Arturito",
                            "Estoy intentando descubrir cómo funciona.",
                            () => {

                                showDialogue(
                                    "Tú",
                                    "Es una cuchara.",
                                    () => {

                                        showDialogue(
                                            "Arturito",
                                            "Exactamente.",
                                            () => {

                                                gameState.stupidity += 2;

                                                updateStats();

                                                saveGame();

                                                startDay();

                                            }
                                        );

                                    }
                                );

                            }
                        );

                    }
                );

            }
        },

        {
            text: "Dejarlo tranquilo",

            action: () => {

                gameState.happiness += 2;

                updateStats();

                saveGame();

                startDay();

            }
        }

    ]);

}


function startDay() {

    showDialogue(
        "",
        "DÍA 1",
        () => {

            showDialogue(
                "",
                "Tu nueva vida con Arturito acaba de comenzar.",
                () => {

                    showDialogue(
                        "Arturito",
                        "¿Hay desayuno?",
                        () => {

                            showChoices([

                                {
                                    text: "Prepararle desayuno",

                                    action: () => {

                                        gameState.hunger += 10;
                                        gameState.money -= 10;

                                        updateStats();

                                        saveGame();

                                        showDialogue(
                                            "Arturito",
                                            "Gracias.",
                                            () => {

                                                showDialogue(
                                                    "",
                                                    "Arturito se come el desayuno.",
                                                    null
                                                );

                                            }
                                        );

                                    }
                                },

                                {
                                    text: "Decirle que no hay",

                                    action: () => {

                                        gameState.hunger -= 10;
                                        gameState.happiness -= 3;

                                        updateStats();

                                        saveGame();

                                        showDialogue(
                                            "Arturito",
                                            "Ah.",
                                            () => {

                                                showDialogue(
                                                    "",
                                                    "Arturito abre una bolsa de cereal que encontró.",
                                                    null
                                                );

                                            }
                                        );

                                    }
                                }

                            ]);

                        }
                    );

                }
            );

        }
    );

}
