export const gameState = {
    version: 1,

    started: false,
    finished: false,

    day: 1,
    year: 0,

    time: {
        period: "morning",
        hour: 8,
        minute: 0
    },

    location: "house",

    player: {
        money: 120,
        energy: 100
    },

    arturito: {
        age: 8,

        hunger: 70,
        happiness: 70,
        energy: 80,

        intelligence: 40,
        confidence: 50,
        nerd: 60,
        trust: 50,

        curiosity: 75,
        mischief: 45,

        personality: {
            sarcasm: 70,
            stubbornness: 65,
            laziness: 50,
            creativity: 60,
            logic: 55,
            empathy: 45
        },

        relationship: {
            affection: 50,
            respect: 40,
            annoyance: 20
        },

        traits: [],

        currentMood: "normal"
    },

    school: {
        grade: 0,
        attendance: 100,
        knowledge: 20,
        reputation: 50,

        subjects: {
            math: 20,
            language: 25,
            science: 30,
            history: 15,
            computing: 50
        },

        pendingExam: false,
        examsPassed: 0,
        examsFailed: 0
    },

    inventory: [],

    flags: {},

    memories: [],

    completedEvents: [],

    activeEvents: [],

    statistics: {
        mealsGiven: 0,
        timesIgnored: 0,
        conversations: 0,
        gamesPlayed: 0,
        moneySpent: 0,
        moneyEarned: 0,
        insultsReceived: 0,
        arguments: 0,
        daysCompleted: 0
    }
};
