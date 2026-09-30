export const scenes = {

    breakfast: {
        speaker: "Arturito",

        text: "Gracias. Aunque esperaba algo más interesante.",

        choices: [
            {
                text: "¿Qué quieres decir con interesante?",
                next: "food_argument"
            },
            {
                text: "Come y ya.",
                next: "eat"
            }
        ]
    },

    cheap_breakfast: {
        speaker: "Arturito",

        text: "¿Cinco pesos? Esto tiene una relación calidad-precio cuestionable.",

        choices: [
            {
                text: "Es comida.",
                next: "eat"
            },
            {
                text: "Entonces no comas.",
                next: "ignore"
            }
        ]
    },

    ignored_food: {
        speaker: "Arturito",

        text: "Ok.",

        choices: [
            {
                text: "¿No vas a decir nada?",
                next: "silent"
            }
        ]
    },

    talk: {
        speaker: "Arturito",

        text: "¿Sabías que técnicamente una cuchara es una herramienta especializada?",

        choices: [
            {
                text: "No empieces.",
                next: "spoon"
            },
            {
                text: "Explícame.",
                next: "spoon"
            }
        ]
    },

    spoon: {
        speaker: "Arturito",

        text: "Exactamente. Sabía que entenderías.",

        choices: []
    },

    play: {
        speaker: "Arturito",

        text: "Ganaste porque te dejé.",

        choices: [
            {
                text: "Claro.",
                next: "play2"
            },
            {
                text: "Perdí contra ti.",
                next: "play2"
            }
        ]
    },

    play2: {
        speaker: "Arturito",

        text: "No importa cuál de las dos dijiste. Gané.",

        choices: []
    },

    insult: {
        speaker: "Arturito",

        text: "¿Eso fue un insulto o una descripción?",

        choices: [
            {
                text: "Un insulto.",
                next: "insult2"
            },
            {
                text: "Una descripción.",
                next: "insult3"
            }
        ]
    },

    insult2: {
        speaker: "Arturito",

        text: "Entonces te esforzaste para decir algo que ya sabíamos.",

        choices: []
    },

    insult3: {
        speaker: "Arturito",

        text: "Ah. Entonces gracias por la información.",

        choices: []
    },

    computer: {
        speaker: "Arturito",

        text: "¿ES MÍA?",

        choices: [
            {
                text: "Sí.",
                next: "computer2"
            }
        ]
    },

    computer2: {
        speaker: "Arturito",

        text: "Voy a instalar Linux.",

        choices: [
            {
                text: "Ni se te ocurra.",
                next: "linux"
            },
            {
                text: "¿Qué es Linux?",
                next: "linux"
            }
        ]
    },

    linux: {
        speaker: "Arturito",

        text: "No importa. Ya empezó la instalación.",

        choices: []
    }
};
