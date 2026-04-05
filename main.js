const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let overlay;

let payload = { cps: 0 };
let cpsClicks = [];

function createWindows() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'Bloxd',
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'assets/icon.png'),
        webPreferences: {
            contextIsolation: true
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL('https://bloxd.io/');
   // mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('before-mouse-event', (_event, mouse) => {
        if (overlay && overlay.webContents && mouse.type === 'mouseDown') {
            if (mouse.button === 'left') overlay.webContents.send('click', 'left');
            if (mouse.button === 'right') overlay.webContents.send('click', 'right');
        }
    });

        mainWindow.webContents.on('before-input-event', (_event, input) => {
        if (overlay && overlay.webContents && input.type === 'keyDown') {
            overlay.webContents.send('keystroke', input.key);
        }
    });

    overlay = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        movable: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        hasShadow: false,
        focusable: false,
        thickFrame: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            backgroundThrottling: false,
        }
    });

    overlay.loadFile('overlay.html');
    overlay.setIgnoreMouseEvents(true, { forward: true });

    mainWindow.on('move', () => {
        const [x, y] = mainWindow.getPosition();
        overlay.setPosition(x, y);
    });

    mainWindow.on('resize', () => {
        const [width, height] = mainWindow.getSize();
        overlay.setSize(width, height);
    });

}

app.whenReady().then(createWindows);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
