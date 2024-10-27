const simulateButtonElement = document.getElementById("simulate-button");
const simulationElement = document.getElementById('simulation');
var spoilerLog;

simulateButtonElement.addEventListener('click', function() {
    const fileUploadElement = document.getElementById('file-upload');
    const spoilerLogFile = fileUploadElement.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        spoilerLog = JSON.parse(event.target.result);
        displaySimulation();
    };

    reader.readAsText(spoilerLogFile)
});

function displaySimulation() {
    simulationElement.innerHTML = '';

    // Starting Kongs
    simulationElement.appendChild(createTitleElement("Starting Kongs"));
    //i dont remember javascript
    for (let kongIndex in spoilerLog['Kongs']["Starting Kong List"]){
        const kong = spoilerLog['Kongs']["Starting Kong List"][kongIndex];
        const kongElement = createCheckElement(kong, kong);
        simulationElement.appendChild(kongElement);
    }

    // Level Order
    simulationElement.appendChild(createTitleElement("Level Order"));
    for (let levelEntrance in spoilerLog['Shuffled Level Order']){
        const level = spoilerLog['Shuffled Level Order'][levelEntrance];
        const levelElement = createCheckElement(levelEntrance, level);
        simulationElement.appendChild(levelElement);
    }

    // Hints
    simulationElement.appendChild(createTitleElement("Hints"));
    for (let hint in spoilerLog['Wrinkly Hints']){
        const hintContents = spoilerLog['Wrinkly Hints'][hint];
        const checkElement = createCheckElement(hint, hintContents);
        simulationElement.appendChild(checkElement);
    }

    // Checks
    simulationElement.appendChild(createTitleElement("Checks"));
    for (let category in spoilerLog.Items){
        const categoryTitleElement = document.createElement('h3');
        categoryTitleElement.textContent = category;
        simulationElement.appendChild(categoryTitleElement);
        for (let check in spoilerLog.Items[category]){
            const checkContents = spoilerLog.Items[category][check];
            const checkElement = createCheckElement(check, checkContents);
            simulationElement.appendChild(checkElement);
        }
    }
}

function createCheckElement(checkName, checkContents) {
    const checkElement = document.createElement('div');
    checkElement.setAttribute('class', 'check');
    
    const checkNameElement = document.createElement('div');
    checkNameElement.setAttribute('class', 'check-name');
    checkNameElement.textContent = checkName;
    checkElement.appendChild(checkNameElement);
    
    const checkContentsElement = document.createElement('div');
    checkContentsElement.setAttribute('class', 'check-contents');
    checkContentsElement.textContent = checkContents;
    checkContentsElement.addEventListener('click', function() {
        this.setAttribute('class', 'check-contents revealed');
    });
    checkElement.appendChild(checkContentsElement);

    return checkElement;
}

function createTitleElement(title) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    return titleElement;
}