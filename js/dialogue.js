const speakerElement =
    document.getElementById("speaker");

const textElement =
    document.getElementById("dialogue-text");

const choicesElement =
    document.getElementById("choices");

const continueButton =
    document.getElementById("continue-btn");


let currentCallback = null;


export function showDialogue(
    speaker,
    text,
    callback = null
) {

    speakerElement.textContent = speaker;

    textElement.textContent = text;

    choicesElement.innerHTML = "";

    currentCallback = callback;

    continueButton.style.display =
        callback ? "block" : "none";
}


export function showChoices(choices) {

    choicesElement.innerHTML = "";

    continueButton.style.display = "none";

    choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener(
            "click",
            () => {

                choicesElement.innerHTML = "";

                if (choice.action) {
                    choice.action();
                }

            }
        );

        choicesElement.appendChild(button);

    });
}


continueButton.addEventListener(
    "click",
    () => {

        if (currentCallback) {

            const callback = currentCallback;

            currentCallback = null;

            callback();

        }

    }
);
