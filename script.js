const { ipcRenderer } = require('electron');

let leftClicks = [];
let rightClicks = [];
let CpsHeight = '40px';
 let CpsWidth = '100px';
const CpsCounter = document.getElementById('cps');
const cpsUpdateInterval = 100; // ms

ipcRenderer.on('click', (_event, button) => {
    const now = Date.now();
    if (button === 'left') leftClicks.push(now);
    if (button === 'right') rightClicks.push(now);
});

function updateCPS() {
    const now = Date.now();
    leftClicks = leftClicks.filter(t => now - t <= 1000);
    rightClicks = rightClicks.filter(t => now - t <= 1000);

    const CpsCounter = document.getElementById('cps'); CpsCounter.innerText = `CPS: ${leftClicks.length} | ${rightClicks.length}`; 
    CpsCounter.style.height = CpsHeight; 
    CpsCounter.style.width = CpsWidth; 
    CpsCounter.style.bottom = CpsHeight; 
    CpsCounter.style.right = CpsHeight; 
}
setInterval(updateCPS, cpsUpdateInterval);

const keys = {};
const keyContainer = document.getElementById('keystrokes');

const activeBg = 'rgba(110,40,40,0.95)';
const activeColor = 'black';
const defaultBg = 'rgba(30,33,41,0.95)';
const defaultColor = 'white';

keys.W = document.createElement('div');
keys.W.className = 'key';
keys.W.textContent = 'W';
keys.W.style.gridArea = '1 / 2 / 2 / 3';
keyContainer.appendChild(keys.W);

keys.A = document.createElement('div');
keys.A.className = 'key';
keys.A.textContent = 'A';
keys.A.style.gridArea = '2 / 1 / 3 / 2';
keyContainer.appendChild(keys.A);

keys.S = document.createElement('div');
keys.S.className = 'key';
keys.S.textContent = 'S';
keys.S.style.gridArea = '2 / 2 / 3 / 3';
keyContainer.appendChild(keys.S);

keys.D = document.createElement('div');
keys.D.className = 'key';
keys.D.textContent = 'D';
keys.D.style.gridArea = '2 / 3 / 3 / 4';
keyContainer.appendChild(keys.D);

const mouseRow = document.createElement('div');
mouseRow.className = 'mouse-row';
mouseRow.style.gridArea = '3 / 1 / 4 / 4';

keys.LMB = document.createElement('div');
keys.LMB.className = 'key';
keys.LMB.textContent = 'LMB';
mouseRow.appendChild(keys.LMB);

keys.RMB = document.createElement('div');
keys.RMB.className = 'key';
keys.RMB.textContent = 'RMB';
mouseRow.appendChild(keys.RMB);

keyContainer.appendChild(mouseRow);

keys.Space = document.createElement('div');
keys.Space.className = 'key space';
keys.Space.textContent = 'SPACE';
keys.Space.style.gridArea = '4 / 1 / 5 / 4';
keyContainer.appendChild(keys.Space);

function highlightKey(key) {
    switch (key.toLowerCase()) {
        case 'w': keys.W.style.background = activeBg; keys.W.style.color = activeColor; break;
        case 'a': keys.A.style.background = activeBg; keys.A.style.color = activeColor; break;
        case 's': keys.S.style.background = activeBg; keys.S.style.color = activeColor; break;
        case 'd': keys.D.style.background = activeBg; keys.D.style.color = activeColor; break;
        case ' ': keys.Space.style.background = activeBg; keys.Space.style.color = activeColor; break;
    }

    setTimeout(() => {
        switch (key.toLowerCase()) {
            case 'w': keys.W.style.background = defaultBg; keys.W.style.color = defaultColor; break;
            case 'a': keys.A.style.background = defaultBg; keys.A.style.color = defaultColor; break;
            case 's': keys.S.style.background = defaultBg; keys.S.style.color = defaultColor; break;
            case 'd': keys.D.style.background = defaultBg; keys.D.style.color = defaultColor; break;
            case ' ': keys.Space.style.background = defaultBg; keys.Space.style.color = defaultColor; break;
        }
    }, 100);
}

ipcRenderer.on('keystroke', (_event, key) => {
    highlightKey(key);
});

ipcRenderer.on('click', (_event, button) => {
    if (button === 'left') {
        keys.LMB.style.background = activeBg;
        keys.LMB.style.color = activeColor;
        setTimeout(() => {
            keys.LMB.style.background = defaultBg;
            keys.LMB.style.color = defaultColor;
        }, 100);
    }
    if (button === 'right') {
        keys.RMB.style.background = activeBg;
        keys.RMB.style.color = activeColor;
        setTimeout(() => {
            keys.RMB.style.background = defaultBg;
            keys.RMB.style.color = defaultColor;
        }, 100);
    }
});