let guessCount = 1;



document.getElementById('guess-input').addEventListener('input', function(event){
    let charCode = event.charCode;
    let inputValue = event.target.value;

    if (!/[a-zA-Z]/.test(String.fromCharCode(charCode)) || inputValue.length >= 5) {
        event.preventDefault();
    }

    // Select the ID of the letter location
    let cellSelector = `#guess-${guessCount}-${inputValue.length}`;
    let cell = document.querySelector(cellSelector);

    //check length of string to change board accordingly

    if (inputValue.length > 5){
        newInputValue = inputValue.substring(0, 5);
        document.getElementById('guess-input').value = newInputValue;
    }

    // Null or undefined check
    else if (inputValue != null && inputValue.length > 0) {
        // Safe to access the last character
        cell.innerHTML = inputValue[inputValue.length - 1];
    } else {
        // Handle null or empty inputValue
        let cellSelector = `#guess-${guessCount}-1`;
        let cell = document.querySelector(cellSelector);
        cell.innerHTML = "";
    }



    if (inputValue.length <= 5 ||  inputValue.length > 0) {
        inputValue[inputValue.length + 1] = "";

        // Select the ID of the letter location to delete
        let cellSelector = `#guess-${guessCount}-${inputValue.length + 1}`;
        let cell = document.querySelector(cellSelector);
        cell.innerHTML = "";
    }

    else {
        // Handle null or empty inputValue
        let cellSelector = `#guess-${guessCount}-1`;
        let cell = document.querySelector(cellSelector);
        cell.innerHTML = "";
    }

    console.log(inputValue.length);


});

document.getElementById('guess-button').addEventListener('click', function(event) {
    event.preventDefault(); 
    let inputValue = document.getElementById('guess-input').value;

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
        if (inputValue[i].toUpperCase() === word[i].toUpperCase()) {
            cell.style.backgroundColor = "#00FF00";
        }
        // If the letter is in the word
        else if (word.toUpperCase().includes(inputValue[i].toUpperCase())) {
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
    document.getElementById('guess-input').value = "";



    if (guessCount === 6) {
        console.log("GameOver!");
    }
});


