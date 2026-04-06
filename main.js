const { app, BrowserWindow, desktopCapturer } = require('electron');
const path = require('path');
const Tesseract = require('tesseract.js');
const { ipcMain } = require('electron');

let mainWindow;
let overlay;

// Example payload object
let payload = { cps: 0 };
let cpsClicks = [];

function createWindows() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'Bloxd',
        frame: true,
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'assets/icon.png'),
        webPreferences: {
            contextIsolation: true
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL('https://bloxd.io/');
    //mainWindow.webContents.openDevTools(); //dev tools for debugging



    //this is an important part for closing
    mainWindow.webContents.on('will-prevent-unload', (event) => {
        event.preventDefault();
    });
    //up to here

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


    //this is an important part for closing
    overlay.setAlwaysOnTop(true, 'screen-saver');
    //up to here

    mainWindow.on('move', () => {
        const [x, y] = mainWindow.getPosition();
        overlay.setPosition(x, y);
    });

    mainWindow.on('resize', () => {
        const [width, height] = mainWindow.getSize();
        overlay.setSize(width, height);
    });
    
    //this is an important part for closing
    mainWindow.on('closed', () => {
        if (overlay) {
            overlay.close();
            overlay = null;
        }
        mainWindow = null;
    });
    //up to here

}
/*
async function runOCR() {
    if (!overlay) return;

    try {
        const sources = await desktopCapturer.getSources({
            types: ['screen'],
            thumbnailSize: { width: 1200, height: 1000 }
        });

        const screen = sources[0];
        const image = screen.thumbnail;

        const scaleX = image.getSize().width / 1366;
        const scaleY = image.getSize().height / 768;

        const crop = {
            x: Math.floor(796 * scaleX),
            y: Math.floor(654 * scaleY),
            width: Math.floor(64 * scaleX),
            height: Math.floor(36 * scaleY)
        };

        const cropped = image.crop(crop);

        // require('fs').writeFileSync('debug.png', cropped.toPNG()); this is for debugging if you are getting nothing enable it and see the png it make to see where the ocr is looking

        const result = await Tesseract.recognize(
            cropped.toDataURL(),
            'eng',
            {
                tessedit_char_whitelist: '0123456789/\\',
            }
        );

        let text = result.data.text;
        text = text.replace(/[^0-9/\\]/g, '').trim();

        overlay.webContents.send('ocr', text);

    } catch { }
} */

app.whenReady().then(createWindows);
