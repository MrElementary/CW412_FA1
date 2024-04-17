function uploadResource() {
    let fileInput = document.getElementById('file-upload');
    let file = fileInput.files[0];

    if (file) {
        console.log("Uploading file:", file.name);
    } else {
        alert("No file selected for upload.");
    }
}

function openResource(url="F:\Semester 2\CW412\Formative Assessments\CWD412 FA1\Phase1_WebWizards_2024\LectureNotes") {
    window.open(url, '_blank');
}

function downloadResource(fileName) {
    const element = document.createElement('a');
    element.setAttribute('href', fileName);
    element.setAttribute('download', '');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
