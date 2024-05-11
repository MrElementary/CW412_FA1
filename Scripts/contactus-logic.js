//db variables
const dbName = "MyTestDatabase";
const dbVersion = 10;
const storeName = "entries";
let store;

// Function to clear input fields
function clearInputFields() {
    var inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(function (input) {
        input.value = ""; // Set input value to empty string
    });
}

function saveEntry(selectedOption, userName, userEmail, userSubject, userDetails) {

    // debug lines
    //console.log(selectedOption, userName, userEmail, userSubject, userDetails);

    const request = window.indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true});
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction(storeName, 'readwrite');
        store = tx.objectStore(storeName);

        // Create an entry object
        const entry = {
            type: selectedOption,
            name: userName,
            email: userEmail,
            subject: userSubject,
            details: userDetails,
        };

        // Add the entry to the object store
        store.put(entry).onsuccess = () => {
            console.log('Blob:', entry);
        };

        request.onerror = (event) => {
            console.error('Error saving entry:', event.target.errorCode);
        };
    }
}

function clearAllDb() {
    window.indexedDB.databases().then((dbs) => {
        dbs.forEach((db) => {
            console.log(db.name + " deleted and yeeted son")
            window.indexedDB.deleteDatabase(db.name);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {

    // Get the submit button
    var submitButton = document.querySelector(".contact-button");

    // Add click event listener to the submit button
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get input values
        var userName = document.querySelector(".name-group input").value.trim();
        var userEmail = document.querySelector(".email-group input").value.trim();
        var userSubject = document.querySelector(".subject-group input").value.trim();
        var userDetails = document.querySelector(".details-group textarea").value.trim();
        var selectedOption = document.querySelector(".contact-select").value;

        // Check if any required field is empty
        if (userName === "" || userEmail === "" || userSubject === "" || userDetails === "") {
            // Display error message in modal
            document.getElementById("modal-message").textContent = "Please fill in all fields.";
            // Display the modal
            document.getElementById("myModal").style.display = "block";
            return; // Exit function, don't proceed with form submission
        }

        saveEntry(selectedOption, userName, userEmail, userSubject, userDetails);

        // Create the message
        var message = "Your message regarding " + selectedOption + " has been saved and sent to relevant parties.";
        // Display the modal message
        document.getElementById("modal-message").textContent = message;
        // Display the modal
        document.getElementById("myModal").style.display = "block";
        // Clear input fields
        clearInputFields();
    });

    // Get the close button
    var closeButton = document.querySelector(".close");

    // Get the modal
    var modal = document.getElementById("myModal");

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
});