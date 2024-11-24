const responseArea = document.getElementById("responseArea");
const wordCountText = document.getElementById("wordCountText");

const ascii = /^[ -~]+$/;
const nonAsciiWhitelist = "m,epw";

responseArea.addEventListener("focus", function() {
    responseArea.style.borderColor = "rgb(255, 255, 255)";
})

responseArea.addEventListener("focusout", function() {
    responseArea.style.borderColor = "rgb(127, 127, 127)";
})

/*
if (Math.floor(Math.random() * 20) != 0) {
    responseArea.placeholder = "Enter response here...";
} else {
    responseArea.placeholder = "Enter bababnas here...";
}

figure out why placeholder text doesnt work in the first place anymore
*/

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

responseArea.onkeyup = function responseUpdate() {
    const text = responseArea.textContent;
    const wordCount = getWordCount(text);

    wordCountText.innerHTML = wordCount;

    if (wordCount < 11) {
        wordCountText.style.color = "rgb(255, 255, 255)";
    } else if (wordCount == 11) {
        wordCountText.style.color = "rgb(127, 255, 127)";
    } else {
        wordCountText.style.color = "rgb(255, 127, 127)";
    }
}

// thanks firefox, would use contenteditable="plaintext-only" otherwise
responseArea.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    const selectedRange = window.getSelection().getRangeAt(0);
    if (!selectedRange || !text) {return;}
  
    selectedRange.deleteContents();
    selectedRange.insertNode(document.createTextNode(text));
    selectedRange.setStart(selectedRange.endContainer, selectedRange.endOffset);
});