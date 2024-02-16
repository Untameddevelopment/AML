let characterToNumber = {}; // Object to store character to number mapping

function generateRandomNumbers(length, seed) {
    const randomNumbers = Array.from({ length: length }, (_, index) => index);
    let currentSeed = parseInt(seed) || 0;

    for (let i = randomNumbers.length - 1; i > 0; i--) {
        const j = (currentSeed + i) % (i + 1);
        [randomNumbers[i], randomNumbers[j]] = [randomNumbers[j], randomNumbers[i]];
    }

    return randomNumbers;
}

function generateCharacterToNumber() {
    const seed = document.getElementById("seed").value;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ,.!?&@#$%^*()[]{}":/;=\'"~`<>|+-_=*'; // Expanded character set
    const charCodeArray = characters.split('').map(char => char.charCodeAt(0));
    let randomNumbers = generateRandomNumbers(charCodeArray.length, seed);

    characterToNumber = {}; // Clear previous mapping
    for (let i = 0; i < charCodeArray.length; i++) {
        const charCode = charCodeArray[i];
        const randomIndex = randomNumbers[i];
        characterToNumber[characters[i]] = randomIndex;
    }

    let assignmentList = '';
    for (const character in characterToNumber) {
        assignmentList += `${character} = ${characterToNumber[character]}\n`;
    }

    document.getElementById("assignment").textContent = assignmentList;
    alert("Character to Number assignment generated with seed: " + seed);
}

function convertNumbersToCharacters() {
    const inputNumbers = document.getElementById("input").value.split(',').map(num => parseInt(num.trim(), 10));
    let outputText = "";

    for (let i = 0; i < inputNumbers.length; i++) {
        const number = inputNumbers[i];
        const character = Object.keys(characterToNumber).find(key => characterToNumber[key] === number);

        if (character) {
            outputText += character;
        } else {
            outputText += "?"; // Handle invalid input
        }
    }

    // Check for image and video links and replace them with appropriate tags
    const mediaRegex = /(http[s]?:\/\/.*?\.(?:png|jpg|jpeg|gif|bmp|mp4))/gi;
    outputText = outputText.replace(mediaRegex, match => {
        if (match.toLowerCase().endsWith('.mp4')) {
            return `<video width="320" height="240" controls><source src="${match}" type="video/mp4"></video>`;
        } else {
            return `<img src="${match}" alt="Media" style="max-width: 100%;">`;
        }
    });

    document.getElementById("output").innerHTML = outputText;
}

function convertCharactersToNumbers() {
    const charInputValue = document.getElementById("charInput").value;
    let outputNumbers = "";
    for (let i = 0; i < charInputValue.length; i++) {
        const character = charInputValue[i];
        const number = characterToNumber[character];
        if (number !== undefined) {
            outputNumbers += (outputNumbers.length > 0 ? ", " : "") + number;
        } else {
            outputNumbers += "?"; // Handle invalid input
        }
    }
    document.getElementById("output").textContent = "Converted Numbers: " + outputNumbers;
}

function generateRandomSeed() {
    return Math.floor(Math.random() * 1000000).toString();
}

document.getElementById("seed").value = generateRandomSeed();
