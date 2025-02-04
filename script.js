let guessCount = 1;
let guessInput = document.getElementById('guess-input')

// Refocus to the input field if focus is lost
document.addEventListener('click', (event) => {
    if (event.target !== guessInput) {
        guessInput.focus();
    }
});

// Input change event for entering a guess
document.getElementById('guess-input').addEventListener('input', function(event){
    let charCode = event.charCode;
    let inputValue = event.target.value;

    if (!/[a-zA-Z]/.test(String.fromCharCode(charCode)) || inputValue.length >= 5) {
        event.preventDefault();
    }

    // Check if the last character is not a letter (alphabetical character)
    if (inputValue.length > 0 && !/[a-zA-Z]/.test(inputValue.charAt(inputValue.length - 1))) {
        // Remove the last character from the input value
        inputValue = inputValue.slice(0, -1);

        // Update the input element value
        event.target.value = inputValue;
    }
    // Now inputValue contains the sanitized value

    document.getElementById('error-message').style.opacity = 0;

    // Check if sixth guess was already made
    if (guessCount > 6) {
        return;
    }

    // Select the ID of the letter location
    let cellSelector = `#guess-${guessCount}-${inputValue.length}`;
    let cell = document.querySelector(cellSelector);

    //if input exceeds 5 trim extra letters
    if (inputValue.length > 5){
        newInputValue = inputValue.substring(0, 5);
        guessInput.value = newInputValue;
    }

    //part of null check
    else if (inputValue != null && inputValue.length > 0) {
        // Safe to access the last character
        cell.innerHTML = inputValue[inputValue.length - 1];
    } else {
        // Handle null or empty inputValue
        let cellSelector = `#guess-${guessCount}-1`;
        let cell = document.querySelector(cellSelector);
        cell.innerHTML = "";
    }

    if (inputValue.length < 5) {
        inputValue[inputValue.length + 1] = "";

        // Select the ID of the letter location to delete
        let cellSelector = `#guess-${guessCount}-${inputValue.length + 1}`;
        let cell = document.querySelector(cellSelector);
        cell.innerHTML = "";
    }

    else if (inputValue.length === 0) {
        // Handle null or empty inputValue
        let cellSelector = `#guess-${guessCount}-1`;
        let cell = document.querySelector(cellSelector);
        cell.innerHTML = "";
    }
});

// Submit guess event for pressing the guess button
document.getElementById('guess-button').addEventListener('click', function(event) {
    event.preventDefault(); 
    inputValue = guessInput.value;
    let errorMessage = document.getElementById('error-message');

    if (inputValue.length != 5 || guessCount > 6) {
        return; // Exit early if input length is invalid
    }

    //binary search function to match guess word to word list
    function binarySearch(word, guesses) {
        let low = 0, high = guesses.length - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (guesses[mid] === word) return true;
            else if (guesses[mid] < word) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }

    // Check if guess is in word list
    if (!binarySearch(guessInput.value, guesses)){
        errorMessage.style.opacity = 100; // Show the error message
        return;
    }
    
    else {
        errorMessage.style.opacity = 0; // Hide the error message if word is found
    }

    // Iterate through each letter in the guess
    for (let i = 0; i < inputValue.length; i++) {
        // Select the ID of the letter location
        let cellSelector = `#guess-${guessCount}-${i+1}`;
        let cell = document.querySelector(cellSelector);

        // If the letter is an exact match
        if (inputValue[i].toUpperCase() === word[i].toUpperCase()) {
            cell.style.backgroundColor = "#66D43C";
        }
        // If the letter is in the word
        else if (word.toUpperCase().includes(inputValue[i].toUpperCase())) {
            cell.style.backgroundColor = "#DEDB1E";
        }
        // If the letter is not in the word
        else {
            cell.style.backgroundColor = "#808080"; // Hex code for grey
        }

        // Add the letter to the guess
        cell.innerHTML = inputValue[i];
    }

    let notification = document.getElementById('notification');

    if (guessCount === 6) {
        if (inputValue.toLowerCase() === word){
            notification.textContent = "YOU WIN";
        }
        else {
            notification.textContent = `The word was ${word.toUpperCase()}`;

        }

        document.getElementById('notification').style.opacity = 100;
    }

    if (inputValue.toLowerCase() === word){
        notification.textContent = "YOU WIN";
        document.getElementById('notification').style.opacity = 100;
        guessCount = 7;
    }

    guessCount++;
    guessInput.value = "";
});

// Enter button event for pressing the guess button
guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('guess-button').click();
    }
});

// Reset button event for pressing the reset button
document.getElementById('reset-button').addEventListener('click', function(event) {
    event.preventDefault(); 

    // Select all td elements within tr elements inside the table with id 'table'
    let tds = document.querySelectorAll('#table tr td');

    // Loop through each td element
    tds.forEach(td => {
        // Set background-color to grey
        td.style.backgroundColor = ''; // You can set the color to 'grey' if needed
        // Clear innerHTML
        td.innerHTML = '';
    });

    // Hide the error message and game notification
    document.getElementById('error-message').style.opacity = 0;
    document.getElementById('notification').style.opacity= 0;
    // Pick a new word
    word = words[Math.floor(Math.random() * words.length)];
    // Reset the guess count for the game logic
    guessCount = 1;
    // Clear out the guess input field
    guessInput.value = "";
});

// Focus on the invisible input on load
window.onload = guessInput.focus();


