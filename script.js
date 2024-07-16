let guessCount = 1;

document.getElementById('guess-input').addEventListener('keypress', function(event){
    let charCode = event.charCode;
    let inputValue = event.target.value;

    if (!/[a-zA-Z]/.test(String.fromCharCode(charCode)) || inputValue.length >= 5) {
        event.preventDefault();
    }
});

document.getElementById('guess-button').addEventListener('click', function(event) {
    event.preventDefault(); 
    let inputValue = document.getElementById('guess-input').value;
    let word = "OTHER";

    console.log('Button clicked! Input value:', inputValue);

    if (inputValue.length > 5) {
        return; // Exit early if input length is invalid
    }

    // Iterate through each letter in the guess
    for (let i = 0; i < inputValue.length; i++) {
        // Select the ID of the letter location
        let cellSelector = `#guess-${guessCount}-${i+1}`;
        let cell = document.querySelector(cellSelector);

        // If the letter is an exact match
        if (inputValue[i].toUpperCase() === word[i]) {
            cell.style.backgroundColor = "#00FF00";
        }
        // If the letter is in the word
        else if (word.includes(inputValue[i].toUpperCase())) {
            cell.style.backgroundColor = "#FFFF00";
        }
        // If the letter is not in the word
        else {
            cell.style.backgroundColor = "#808080"; // Hex code for grey
        }

        // Add the letter to the guess
        cell.innerHTML = inputValue[i];
    }

    guessCount++;



    if (guessCount === 6) {
        console.log("GameOver!");
    }
});
