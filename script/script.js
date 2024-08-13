function beautifyJSON() {
    const input = document.getElementById('input').value;
    try {
        const parsed = JSON.parse(input);
        const beautified = JSON.stringify(parsed, null, 4);
        document.getElementById('result').value = beautified;
    } catch (e) {
        alert('Invalid JSON');
    }
}

function minifyJSON() {
    const input = document.getElementById('input').value;
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        document.getElementById('result').value = minified;
    } catch (e) {
        alert('Invalid JSON');
    }
}

function uploadFile() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.json';
    inputElement.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('input').value = e.target.result;
            };
            reader.readAsText(file);
        }
    };
    inputElement.click();
}

function uploadFromUrl() {
    const url = prompt('Enter the URL of the JSON file:');
    if (url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('input').value = JSON.stringify(data, null, 4);
            })
            .catch(error => alert('Failed to fetch JSON from URL'));
    }
}

function copyResult() {
    const resultArea = document.getElementById('result');
    resultArea.select();
    document.execCommand('copy');
    alert('Result copied to clipboard');
}

function downloadResult() {
    const resultArea = document.getElementById('result');
    const data = resultArea.value;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
}