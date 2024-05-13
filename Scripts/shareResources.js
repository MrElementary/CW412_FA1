document.addEventListener("DOMContentLoaded", function () {

    const uploadButton = document.querySelector('.upload-button');
    const fileInput = document.getElementById('file-upload');

    uploadButton.addEventListener('click', () => {
        const file = fileInput.files[0];


        if (file) {

            // Creating a reader to store pdf as array and not blobs
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = () => {

                const arrayBuffer = reader.result;

                console.log("Uploading file:", file.name);

                const dbName = 'myDB';
                const dbVersion = 11;
                const storeName = 'files';
                

                const request = window.indexedDB.open(dbName, dbVersion);

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    console.log("Object store 'files' created");
                    db.createObjectStore(storeName);
                };

                request.onsuccess = () => {
                    const db = request.result;
                    const tx = db.transaction(storeName, 'readwrite');
                    const store = tx.objectStore(storeName);
                    console.log("Transaction and object store accessed successfully");

                    console.log(file.name, file.type);
                    store.add({ arrayBuffer: arrayBuffer, type: file.type, name: file.name }, file.name);
                    alert("File has been successfully uploaded!");
                    document.getElementById('file-upload').value = '';
                }
            }
        } else {
            alert("No file selected for upload.");
            return;
        }
    });
});

