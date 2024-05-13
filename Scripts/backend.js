function clearStorageAndNavigate(dbName, storeName) {

    window.indexedDB.databases().then((dbs) => {
        if (dbs.some((db) => db.name === dbName)) {
            const request = indexedDB.open(dbName);
            request.onsuccess = () => {
                const db = request.result;
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                const countRequest = store.count();
                countRequest.onsuccess = () => {
                    if (countRequest.result > 0) {
                        store.clear();
                        db.close();
                        var message = "DB Cleared!";
                        document.getElementById("modal-message").textContent = message;
                        document.getElementById("myModal").style.display = "block";
                    } else {
                        var message = "No data exists in the database!";
                        document.getElementById("modal-message").textContent = message;
                        document.getElementById("myModal").style.display = "block";
                    }
                }
            }
        } else {
            var message = "No data exists yet, Nothing to clear!";
            // Display the modal message
            document.getElementById("modal-message").textContent = message;
            // Display the modal
            document.getElementById("myModal").style.display = "block";
        };
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    var closeButton = document.querySelector(".close");

    var modal = document.getElementById("myModal");

    // When the user clicks on <span> (x), close the modal
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
        if (page === 'one') {
            window.location.href = 'Contact Us.html';
        } else if (page === 'two') {
            window.location.href = 'shareResources.html';
        } else if (page === 'three') {
            window.location.href = 'Discussions.html';
        }
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            if (page === 'one') {
                window.location.href = 'Contact Us.html';
            } else if (page === 'two') {
                window.location.href = 'shareResources.html';
            } else if (page === 'three') {
                window.location.href = 'Discussions.html';
            }
        }
    });

    if (page === 'one') {

        //db variables
        const dbName = "MyTestDatabase";
        const dbVersion = 10;
        const storeName = "entries";
        var counter = 0;

        window.indexedDB.databases().then((dbs) => {

            if (dbs.some((db) => db.name === dbName)) {
                const request = window.indexedDB.open(dbName, dbVersion);

                request.onsuccess = (event) => {

                    const db = event.target.result;
                    const tx = db.transaction(storeName, 'readwrite');
                    const store = tx.objectStore(storeName);

                    const getAllRequest = store.getAll();

                    getAllRequest.onsuccess = () => {
                        const blobs = getAllRequest.result;

                        const firstBodyDiv = document.querySelector('.first-body');

                        blobs.forEach((blob) => {
                            const entryHTML = `
              <div>
                <h2>Entry #${counter}</h2>
                <p>Type: ${blob.type}</p>
                <p>Name: ${blob.name}</p>
                <p>Email: ${blob.email}</p>
                <p>Subject: ${blob.subject}</p>
                <p>Details: ${blob.details}</p>
              </div>
            `;
                            // Append the entryHTML to the firstBodyDiv
                            firstBodyDiv.innerHTML += entryHTML;
                            counter += 1;
                        });
                    }
                }
            } else {
                // Create the message
                var message = "No data exists yet, you'll need to post or upload first to initialize the DataBase!";
                // Display the modal message
                document.getElementById("modal-message").textContent = message;
                // Display the modal
                document.getElementById("myModal").style.display = "block";
            }
        });

        document.querySelector('.clearButton').addEventListener('click', function () {
            clearStorageAndNavigate(dbName, storeName);
        });

    } else if (page === 'two') {

        // db variables
        const dbName = "myDB";
        const dbVersion = 11;
        const storeName = "files"; 

        window.indexedDB.databases().then((dbs) => {
            // Debug log line
            //console.log(dbs);

            if (dbs.some((db) => db.name === dbName)) {
                // Database exists, proceed with opening it
                const request = window.indexedDB.open(dbName, dbVersion);

                request.onsuccess = (event) => {
                    const db = event.target.result;
                    const tx = db.transaction(storeName, 'readonly');
                    const store = tx.objectStore(storeName);

                    const getAllRequest = store.getAll();

                    getAllRequest.onsuccess = () => {
                        const files = getAllRequest.result;
                        const fileListDiv = document.querySelector('.first-body');

                        files.forEach((file) => {
                            const name = file.name;
                            console.log(file.name);
                            const blob = new Blob([file.arrayBuffer], { type: file.type });
                            const url = URL.createObjectURL(blob);
                            const fileHTML = `
                <div>
                    <a href="${url}" style="font-weight: bold;" download="${file.name}">${file.name}</a> (${file.type})
                </div>
              `;
                            // Append the fileHTML to the fileListDiv
                            fileListDiv.innerHTML += fileHTML;
                        });
                    }
                }

            } else {
                // Create the message
                var message = "No data exists yet, you'll need to post or upload first to initialize the DataBase!";
                // Display the modal message
                document.getElementById("modal-message").textContent = message;
                // Display the modal
                document.getElementById("myModal").style.display = "block";
            }
        });

        document.querySelector('.clearButton').addEventListener('click', function () {
            clearStorageAndNavigate(dbName, storeName);
        });

    } else if (page === 'three') {

        const dbName = "MyPostDB";
        const dbVersion = 13;
        const storeName = "posts";
        var counter = 0;

        window.indexedDB.databases().then((dbs) => {

            if (dbs.some((db) => db.name === dbName)) {

                const request = window.indexedDB.open(dbName, dbVersion);

                request.onsuccess = (event) => {

                    const db = event.target.result;
                    const tx = db.transaction(storeName, 'readwrite');
                    const store = tx.objectStore(storeName);

                    const getAllRequest = store.getAll();

                    getAllRequest.onsuccess = () => {
                        const blobs = getAllRequest.result;

                        const firstBodyDiv = document.querySelector('.first-body');

                        blobs.forEach((blob) => {
                            const entryHTML = `
              <div>
                <h2>Entry #${counter}</h2>
                <p>Name: ${blob.name}</p>
                <p>Details: ${blob.details}</p>
              </div>
            `;
                            // Append the entryHTML to the firstBodyDiv
                            firstBodyDiv.innerHTML += entryHTML;
                            counter += 1;
                        });
                    }
                }
            } else {
                // Create the message
                var message = "No data exists yet, you'll need to post or upload first to initialize the DataBase!";
                // Display the modal message
                document.getElementById("modal-message").textContent = message;
                // Display the modal
                document.getElementById("myModal").style.display = "block";
            }
        });

        document.querySelector('.clearButton').addEventListener('click', function () {
            clearStorageAndNavigate(dbName, storeName, page);
        });
    }
});