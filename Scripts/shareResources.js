document.addEventListener("DOMContentLoaded", function () {

    const uploadButton = document.querySelector('.upload-button');
    const fileInput = document.getElementById('file-upload');

    uploadButton.addEventListener('click', () => {
        const file = fileInput.files[0];

        if (file) {
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

                const fileBlob = new Blob([file], { type: file.type });
                const fileData = {
                    name: file.name,
                    type: file.type,
                    data: fileBlob
                };

                console.log(file.name, file.type);
                store.add(fileData, file.name);
                alert("File has been successfully uploaded!");
                document.getElementById('file-upload').value = '';
            }
        } else {
            alert("No file selected for upload.");
            return;
        }
    });
});

