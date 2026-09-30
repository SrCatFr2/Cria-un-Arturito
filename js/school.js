import { gameState } from "./state.js";
import { improveIntelligence, changeStat } from "./stats.js";

export function attendSchool() {
    gameState.school.attendance =
        Math.min(100, gameState.school.attendance + 1);

    improveIntelligence(2);

    changeStat("happiness", -3);
    changeStat("energy", -8);
}

export function study(subject, minutes = 30) {
    if (!(subject in gameState.school.subjects)) {
        return false;
    }

    const gain = Math.max(1, Math.floor(minutes / 10));

    gameState.school.subjects[subject] += gain;

    gameState.school.subjects[subject] =
        Math.min(100, gameState.school.subjects[subject]);

    improveIntelligence(Math.floor(gain / 2));

    changeStat("energy", -5);

    return true;
}

export function startExam(subject) {
    const knowledge = gameState.school.subjects[subject];

    const intelligence = gameState.arturito.intelligence;

    const score =
        knowledge * 0.65 +
        intelligence * 0.35 +
        Math.random() * 20;

    if (score >= 60) {
        gameState.school.examsPassed++;

        return {
            passed: true,
            score: Math.round(score)
        };
    }

    gameState.school.examsFailed++;

    return {
        passed: false,
        score: Math.round(score)
    };
}

export function assignHomework(subject) {
    gameState.flags.homework = subject;
}
