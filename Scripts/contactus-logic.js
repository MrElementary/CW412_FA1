document.addEventListener("DOMContentLoaded", function() {
    // Function to clear input fields
    function clearInputFields() {
        var inputs = document.querySelectorAll("input, textarea");
        inputs.forEach(function(input) {
            input.value = ""; // Set input value to empty string
        });
    }

    // Get the submit button
    var submitButton = document.querySelector(".contact-button");

    // Add click event listener to the submit button
    submitButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get input values
        var name = document.querySelector(".name-group input").value.trim();
        var email = document.querySelector(".email-group input").value.trim();
        var subject = document.querySelector(".subject-group input").value.trim();
        var details = document.querySelector(".details-group textarea").value.trim();
        var selectedOption = document.querySelector(".contact-select").value;

        // Check if any required field is empty
        if (name === "" || email === "" || subject === "" || details === "") {
            // Display error message in modal
            document.getElementById("modal-message").textContent = "Please fill in all fields.";
            // Display the modal
            document.getElementById("myModal").style.display = "block";
            return; // Exit function, don't proceed with form submission
        }

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
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
        // Clear input fields when closing the modal
        clearInputFields();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            // Clear input fields when closing the modal
            clearInputFields();
        }
    });
});