document.addEventListener("DOMContentLoaded", function() {
    // Function to clear input fields
    function clearInputFields() {
        var inputs = document.querySelectorAll(".question-text, textarea");
        inputs.forEach(function(input) {
            input.value = ""; // Set input value to empty string
        });
    }

    // Get the submit button
    var submitButton = document.querySelector(".submit-button");

    // Add click event listener to the submit button
    submitButton.addEventListener("click", function(event) {

        var name = document.querySelector(".question-text, textarea").value.trim();
        

        // Check if any required field is empty
        if (name === "") {
            // Display error message in modal
            document.getElementById("modal-message").textContent = "Please fill the question field before submitting.";
            // Display the modal
            document.getElementById("myModal").style.display = "block";
            return; // Exit function, don't proceed with form submission
        }

        // Create the message
        var message = "Your question has been posted!";
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