const backgroundDiv = document.getElementById("id");
const squiggleBase = document.createElement("div");
squiggleBase.classList.add("squiggle");

function getRandom(upperLimit) {
    return Math.floor(Math. random() * upperLimit) + 1
}

function createVariance() {
    
}

squiggleBase.style.clipPath = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;

// note for later: figure out how to not have to include this lol
const newContent = document.createTextNode("");
squiggleBase.appendChild(newContent);

// make it insert inside backgroundDiv
// document.body.insertBefore(squiggleBase, backgroundDiv);