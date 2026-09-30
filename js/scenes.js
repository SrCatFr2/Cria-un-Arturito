import { gameState } from "./state.js";

export const scenes = {

    // =========================================================
    // DÍA 1 — EL DESPERTAR
    // =========================================================

    dia1: {
        location: "house",
        start: "wake_up",

        nodes: {

            // -------------------------------------------------
            // INTRO
            // -------------------------------------------------

            wake_up: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "¡YA DESPERTÉ!"
                },

                next: "@morning_question"
            },

            morning_question: {
                dialogue: {
                    speaker: "TÚ",
                    text: "¿Qué estás haciendo?"
                },

                next: "@thinking"
            },

            thinking: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "Estoy pensando."
                },

                next: "@what_thinking"
            },

            what_thinking: {
                dialogue: {
                    speaker: "TÚ",
                    text: "¿En qué?"
                },

                next: "@dont_know"
            },

            dont_know: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "No sé."
                },

                next: "@spoon"
            },

            spoon: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "..."
                },

                action: "look_at_spoon",

                next: "@spoon_question"
            },

            spoon_question: {
                dialogue: {
                    speaker: "TÚ",
                    text: "¿Por qué estás mirando la cuchara?"
                },

                next: "@spoon_answer"
            },

            spoon_answer: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "Estoy intentando descubrir cómo funciona."
                },

                next: "@spoon_reaction"
            },

            spoon_reaction: {
                dialogue: {
                    speaker: "TÚ",
                    text: "Es una cuchara."
                },

                next: "@exactly"
            },

            exactly: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "Exactamente."
                },

                effects: [
                    {
                        flag: "knows_about_spoon",
                        value: true
                    }
                ],

                next: "@first_choice"
            },

            // -------------------------------------------------
            // PRIMERA DECISIÓN
            // -------------------------------------------------

            first_choice: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Bueno... ¿qué quieres hacer?"
                },

                choices: [

                    {
                        text: "Prepararle desayuno",
                        next: "@breakfast",
                        effects: [
                            {
                                change: "arturito.happiness",
                                amount: 5
                            },
                            {
                                change: "arturito.trust",
                                amount: 3
                            }
                        ]
                    },

                    {
                        text: "Decirle que se prepare solo",
                        next: "@alone",
                        effects: [
                            {
                                change: "arturito.confidence",
                                amount: 4
                            },
                            {
                                change: "arturito.trust",
                                amount: -2
                            }
                        ]
                    },

                    {
                        text: "Volver a dormir",
                        next: "@sleep",
                        effects: [
                            {
                                change: "arturito.happiness",
                                amount: -4
                            },
                            {
                                change: "arturito.trust",
                                amount: -5
                            },
                            {
                                change: "statistics.timesIgnored",
                                amount: 1
                            }
                        ]
                    }
                ]
            },

            // =================================================
            // DESAYUNO
            // =================================================

            breakfast: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Voy a prepararte algo de desayunar."
                },

                action: "breakfast",

                next: "@breakfast_arturito"
            },

            breakfast_arturito: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "¿Hay cereal?"
                },

                choices: [

                    {
                        text: "Sí.",
                        next: "@cereal_yes",
                        condition: {
                            stat: "arturito.hunger",
                            operator: ">",
                            value: 30
                        }
                    },

                    {
                        text: "No.",
                        next: "@cereal_no"
                    }
                ]
            },

            cereal_yes: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Perfecto."
                },

                effects: [
                    {
                        change: "arturito.hunger",
                        amount: 20,
                        min: 0,
                        max: 100
                    },
                    {
                        change: "arturito.happiness",
                        amount: 3
                    }
                ],

                next: "@after_food"
            },

            cereal_no: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Entonces tomaré agua."
                },

                next: "@after_food"
            },

            // =================================================
            // LO DEJAS SOLO
            // =================================================

            alone: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Prepárate tú solo. Ya estás grande."
                },

                next: "@alone_reaction"
            },

            alone_reaction: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Tengo ocho años."
                },

                next: "@alone_reaction2"
            },

            alone_reaction2: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Eso técnicamente cuenta como grande, supongo."
                },

                effects: [
                    {
                        change: "arturito.confidence",
                        amount: 3
                    },
                    {
                        change: "arturito.creativity",
                        amount: 2
                    }
                ],

                next: "@after_food"
            },

            // =================================================
            // VOLVER A DORMIR
            // =================================================

            sleep: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Tengo sueño. Haz lo que quieras."
                },

                next: "@sleep_reaction"
            },

            sleep_reaction: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Está bien."
                },

                next: "@sleep_reaction2"
            },

            sleep_reaction2: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Creo que voy a investigar por qué existen las cucharas."
                },

                effects: [
                    {
                        change: "arturito.nerd",
                        amount: 3
                    },
                    {
                        change: "arturito.curiosity",
                        amount: 5
                    }
                ],

                next: "@after_food"
            },

            // =================================================
            // DESPUÉS DEL DESAYUNO
            // =================================================

            after_food: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Bueno. ¿Qué hacemos ahora?"
                },

                choices: [

                    {
                        text: "Hablar con Arturito",
                        next: "@talk"
                    },

                    {
                        text: "Jugar un rato",
                        next: "@play"
                    },

                    {
                        text: "Mandarlo a estudiar",
                        next: "@study"
                    }
                ]
            },

            // =================================================
            // CONVERSACIÓN
            // =================================================

            talk: {

                dialogue: {
                    speaker: "TÚ",
                    text: "¿Qué te gustaría hacer hoy?"
                },

                next: "@talk_answer"
            },

            talk_answer: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "No sé."
                },

                next: "@talk_answer2"
            },

            talk_answer2: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Siempre dices eso."
                },

                next: "@talk_reaction"
            },

            talk_reaction: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Porque siempre funciona."
                },

                effects: [
                    {
                        change: "arturito.confidence",
                        amount: 2
                    },
                    {
                        change: "statistics.conversations",
                        amount: 1
                    }
                ],

                next: "@insult_test"
            },

            // =================================================
            // PRUEBA DE PERSONALIDAD
            // =================================================

            insult_test: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Eres un idiota."
                },

                choices: [

                    {
                        text: "Dejarlo así",
                        next: "@reaction_normal"
                    },

                    {
                        text: "Insistir",
                        next: "@insult_again",
                        effects: [
                            {
                                change: "arturito.relationship.annoyance",
                                amount: 5
                            },
                            {
                                change: "statistics.insultsReceived",
                                amount: 1
                            }
                        ]
                    }
                ]
            },

            reaction_normal: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Ok."
                },

                next: "@afternoon"
            },

            insult_again: {

                dialogue: {
                    speaker: "TÚ",
                    text: "No, en serio. Eres un idiota."
                },

                next: "@word_twist"
            },

            word_twist: {

                condition: {
                    stat: "arturito.personality.sarcasm",
                    operator: ">=",
                    value: 60
                },

                dialogue: {
                    speaker: "ARTURITO",
                    text: "¿Tú eres idiota? Dijiste."
                },

                next: "@word_twist2"
            },

            word_twist2: {

                dialogue: {
                    speaker: "TÚ",
                    text: "No, dije que tú eres idiota."
                },

                next: "@word_twist3"
            },

            word_twist3: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Entonces estás admitiendo que yo soy tú."
                },

                effects: [
                    {
                        change: "arturito.confidence",
                        amount: 5
                    },
                    {
                        change: "arturito.sarcasm",
                        amount: 3
                    }
                ],

                next: "@word_twist_win"
            },

            word_twist_win: {

                dialogue: {
                    speaker: "TÚ",
                    text: "..."
                },

                next: "@afternoon"
            },

            // =================================================
            // JUGAR
            // =================================================

            play: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Vamos a jugar."
                },

                effects: [
                    {
                        change: "arturito.happiness",
                        amount: 10
                    },
                    {
                        change: "arturito.energy",
                        amount: -8
                    },
                    {
                        change: "statistics.gamesPlayed",
                        amount: 1
                    }
                ],

                next: "@play_reaction"
            },

            play_reaction: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "¿Y si hacemos algo competitivo?"
                },

                next: "@competitive"
            },

            competitive: {

                choices: [

                    {
                        text: "Aceptar",
                        next: "@competitive_yes",
                        effects: [
                            {
                                change: "arturito.confidence",
                                amount: 4
                            }
                        ]
                    },

                    {
                        text: "No, mejor algo tranquilo",
                        next: "@competitive_no"
                    }
                ]
            },

            competitive_yes: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Excelente. Te voy a ganar."
                },

                next: "@afternoon"
            },

            competitive_no: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Cobarde."
                },

                next: "@afternoon"
            },

            // =================================================
            // ESTUDIAR
            // =================================================

            study: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Vamos a estudiar."
                },

                effects: [
                    {
                        change: "arturito.intelligence",
                        amount: 4
                    },
                    {
                        change: "arturito.happiness",
                        amount: -2
                    }
                ],

                next: "@study_reaction"
            },

            study_reaction: {

                condition: {
                    stat: "arturito.nerd",
                    operator: ">=",
                    value: 60
                },

                dialogue: {
                    speaker: "ARTURITO",
                    text: "¿Podemos estudiar informática?"
                },

                next: "@linux"
            },

            linux: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Quiero instalar Linux."
                },

                choices: [

                    {
                        text: "¿Qué es Linux?",
                        next: "@linux_explain"
                    },

                    {
                        text: "No.",
                        next: "@linux_no"
                    }
                ]
            },

            linux_explain: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Un sistema operativo."
                },

                next: "@linux_explain2"
            },

            linux_explain2: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Pero mejor que Windows."
                },

                effects: [
                    {
                        change: "arturito.nerd",
                        amount: 5
                    },
                    {
                        flag: "arturito_discovered_linux",
                        value: true
                    }
                ],

                next: "@afternoon"
            },

            linux_no: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Lo instalaré cuando estés dormido."
                },

                effects: [
                    {
                        change: "arturito.mischief",
                        amount: 4
                    }
                ],

                next: "@afternoon"
            },

            // =================================================
            // TARDE
            // =================================================

            afternoon: {

                action: "advance_afternoon",

                dialogue: {
                    speaker: "TÚ",
                    text: "Ya es tarde."
                },

                next: "@afternoon_question"
            },

            afternoon_question: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "¿Ya vamos a comer?"
                },

                choices: [

                    {
                        text: "Sí, vamos.",
                        next: "@eat"
                    },

                    {
                        text: "Todavía no.",
                        next: "@wait"
                    }
                ]
            },

            eat: {

                action: "lunch",

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Gracias."
                },

                effects: [
                    {
                        change: "arturito.happiness",
                        amount: 3
                    }
                ],

                next: "@evening"
            },

            wait: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Está bien."
                },

                next: "@wait2"
            },

            wait2: {

                condition: {
                    stat: "arturito.hunger",
                    operator: "<=",
                    value: 35
                },

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Pero tengo hambre."
                },

                effects: [
                    {
                        change: "arturito.happiness",
                        amount: -5
                    }
                ],

                next: "@evening"
            },

            // =================================================
            // NOCHE
            // =================================================

            evening: {

                action: "advance_evening",

                dialogue: {
                    speaker: "TÚ",
                    text: "Ya casi es hora de dormir."
                },

                next: "@bed"
            },

            bed: {

                dialogue: {
                    speaker: "TÚ",
                    text: "A dormir."
                },

                choices: [

                    {
                        text: "Darle las buenas noches",
                        next: "@goodnight"
                    },

                    {
                        text: "Mandarlo directamente a dormir",
                        next: "@sleep_direct"
                    }
                ]
            },

            goodnight: {

                dialogue: {
                    speaker: "TÚ",
                    text: "Buenas noches, Arturito."
                },

                next: "@goodnight_response"
            },

            goodnight_response: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Buenas noches."
                },

                effects: [
                    {
                        change: "arturito.trust",
                        amount: 2
                    },
                    {
                        change: "arturito.relationship.affection",
                        amount: 2
                    }
                ],

                next: "@end_day"
            },

            sleep_direct: {

                dialogue: {
                    speaker: "TÚ",
                    text: "A dormir. Ya."
                },

                next: "@sleep_direct_response"
            },

            sleep_direct_response: {

                dialogue: {
                    speaker: "ARTURITO",
                    text: "Ok."
                },

                effects: [
                    {
                        change: "arturito.happiness",
                        amount: -2
                    }
                ],

                next: "@end_day"
            },

            // =================================================
            // FIN DEL DÍA
            // =================================================

            end_day: {

                action: "end_day",

                dialogue: {
                    speaker: "SISTEMA",
                    text: "Día 1 completado."
                },

                end: true
            }
        }
    },

    // =========================================================
    // ESCENA ESPECIAL: ARTURITO DESCUBRE LINUX
    // =========================================================

    descubrimiento_linux: {

        condition: {
            flag: "arturito_discovered_linux",
            equals: true
        },

        start: "start",

        nodes: {

            start: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "He estado pensando."
                },

                next: "@second"
            },

            second: {
                dialogue: {
                    speaker: "TÚ",
                    text: "Eso nunca termina bien."
                },

                next: "@third"
            },

            third: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "Creo que deberíamos usar Arch."
                },

                choices: [

                    {
                        text: "¿Qué es Arch?",
                        next: "@arch"
                    },

                    {
                        text: "No.",
                        next: "@no_arch"
                    }
                ]
            },

            arch: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "Una distribución de Linux."
                },

                next: "@arch2"
            },

            arch2: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "Es complicada."
                },

                next: "@arch3"
            },

            arch3: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "Por eso es mejor."
                },

                effects: [
                    {
                        change: "arturito.nerd",
                        amount: 8
                    },
                    {
                        change: "arturito.confidence",
                        amount: 5
                    },
                    {
                        flag: "arch_user",
                        value: true
                    }
                ],

                end: true
            },

            no_arch: {
                dialogue: {
                    speaker: "ARTURITO",
                    text: "No sabes lo que estás diciendo."
                },

                effects: [
                    {
                        change: "arturito.confidence",
                        amount: 3
                    }
                ],

                end: true
            }
        }
    }
};
