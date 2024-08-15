const indicator = document.getElementById("dumbassCat");
const ewowResponse = document.getElementById("ewowResponse");
const wordsText = document.getElementById("wordsText");
const mistakeText = document.getElementById("mistakeText");

const ascii = /^[ -~]+$/;
const emptyImg = "dumbassCat/neutral.webp";
const okImg = "dumbassCat/okay.webp";
const validImg = "dumbassCat/smiling.webp";
const invalidImg = "dumbassCat/sad.webp";
const horrorImg = "dumbassCat/horror.webp"

if (Math.floor(Math.random() * 20) != 0) {
    ewowResponse.placeholder = "Response here";
} else {
    ewowResponse.placeholder = "Bababnas";
}

// literally stole this code from carys github and used .py to .js converter lol
function getWordCount(text) {
    if (!text) {
        return 0;
    }

    const words = text.split(" ");
    let wordCount = 0;

    for (const word of words) {
        let hasAlphanum = false;

        for (const char of word) {
            if (/[a-zA-Z0-9]/.test(char)) {
                hasAlphanum = true;
                break;
            }
        }

        if (hasAlphanum) {
            wordCount += 1;
        }
    }

    return wordCount;
}

let invalidTrue = false

function defaultLook(wordCount) {
    invalidTrue = false

    const greenColour = 31 + wordCount
    const blueColour = Math.floor(31 + wordCount / 2)

    document.body.style.background = "rgb(31," + greenColour + "," + blueColour + ")";
    mistakeText.innerHTML = ""
}

function validLook() {
    invalidTrue = false

    document.body.style.background = "rgb(31, 63, 47)";
    indicator.src = validImg;
    mistakeText.innerHTML = ""
}

function invalidLook() {
    invalidTrue = true
    document.body.style.background = "rgb(63, 31, 47)";

    if (Math.floor(Math.random() * 1000) != 0) {
        indicator.src = invalidImg;
    } else {
        indicator.src = horrorImg;
    }
}

wordsText.innerHTML = "0";
defaultLook(0)

ewowResponse.addEventListener("focus", function() {
    ewowResponse.style.borderBottomColor = "rgb(255, 255, 255)";
})

ewowResponse.addEventListener("focusout", function() {
    ewowResponse.style.borderBottomColor = "rgb(127, 127, 127)";
})

ewowResponse.onkeyup = function responseUpdate() {
    const text = ewowResponse.value
    const wordCount = getWordCount(text);
    wordsText.innerHTML = wordCount;

    // i should probably code this differently but i dont care :3
    if (!text) {
        defaultLook(0)
        indicator.src = emptyImg;

    } else if (!ascii.test(text)) {
        if (!invalidTrue) {
            invalidLook()
            mistakeText.innerHTML = "CONTAINS NON-ASCII CHARACTERS"
        }

    } else if (wordCount < 11) {
        defaultLook(wordCount)
        indicator.src = okImg;

    } else if (wordCount > 11) {
        invalidLook()
        mistakeText.innerHTML = "OVER 11 WORDS"

    } else {
        validLook()
    }
}