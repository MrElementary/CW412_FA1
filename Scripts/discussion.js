const dbName = "MyPostDB";
const dbVersion = 13;
const storeName = "posts";
let store;

function saveEntry(userName, userDetails) {

    const request = window.indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
        // Create object store only when database is upgraded
        const db = event.target.result;
        store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true});
    };

    // debug lines
    request.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction(storeName, 'readwrite');
        store = tx.objectStore(storeName);

        // Create an entry object
        const entry = {
            name: userName,
            details: userDetails,
        };

        // Add the entry to the object store
        store.put(entry).onsuccess = () => {
            console.log('Blob:', entry);
        };

        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
            const blobs = getAllRequest.result;
            console.log('All Blobs:');
            blobs.forEach((blob) => console.log(blob));
        };

        db.onerror = (event) => {
            console.error('Error saving entry:', event.target.errorCode);
        };
    }
}

function postQuestion(newQuestion, newUserName) {

    // Select the elements
    const questionOne = document.querySelector('.pOne');
    const userOne = document.querySelector('.uOne');
    const questionTwo = document.querySelector('.pTwo');
    const userTwo = document.querySelector('.uTwo');
    const questionThree = document.querySelector('.pThree');
    const userThree = document.querySelector('.uThree');

    // Get the new question and user from the input fields
    newQuestion = document.getElementById('question').value;
    newUserName = document.querySelector('.java-name').value;

    // Move the existing questions and users down
    questionThree.textContent = questionTwo.textContent;
    userThree.textContent = userTwo.textContent;
    questionTwo.textContent = questionOne.textContent;
    userTwo.textContent = userOne.textContent;

    // Update the first question and user with the new ones
    questionOne.textContent = newQuestion;
    userOne.textContent = newUserName;
}

// Function to clear input fields
function clearInputFields() {
    var inputs = document.querySelectorAll(".java-question, textarea");
    var inputs_two = document.querySelectorAll(".java-name, textarea");
    inputs.forEach(function (input) {
        input.value = "";
        inputs_two.values = "";
    });
}

function checkInputFields() {
    var question = document.querySelector(".java-question").value.trim();
    var name = document.querySelector(".java-name").value.trim();

    // Check if any required field is empty
    if (question === "") {
        // Display error message in modal
        document.getElementById("modal-message").textContent = "Please fill the question field before submitting.";
        // Display the modal
        document.getElementById("myModal").style.display = "block";
        return; // Exit function, don't proceed with form submission
    }

    // Check if any required field is empty
    if (name === "") {
        // Display error message in modal
        document.getElementById("modal-message").textContent = "Please fill the name field before submitting.";
        // Display the modal
        document.getElementById("myModal").style.display = "block";
        return; // Exit function, don't proceed with form submission
    }

    // Update the questions on the screen
    postQuestion(question, name);
    saveEntry(name, question);

    // Create the message
    var message = "Your question has been posted!";
    // Display the modal message
    document.getElementById("modal-message").textContent = message;
    // Display the modal
    document.getElementById("myModal").style.display = "block";
    // Clear input fields
    clearInputFields();
}

document.addEventListener("DOMContentLoaded", function () {

    // Get the submit buttons
    var submitButton = document.querySelector(".submit-button");

    // Get the close button
    var closeButton = document.querySelector(".close");

    // Get the modal
    var modal = document.getElementById("myModal");

    var viewButton = document.querySelector(".view-questions-button");

    // Add click event listener to the submit button
    submitButton.addEventListener("click", function (event) {
        checkInputFields();
    });

    // When the user clicks on <span> (x), close the modal
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
        // Clear input fields when closing the modal
        clearInputFields();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            // Clear input fields when closing the modal
            clearInputFields();
        }
    });

    viewButton.addEventListener("click", function (event) {
        viewSubmissions();
    });
});