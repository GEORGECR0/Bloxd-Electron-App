const { app, BrowserWindow, desktopCapturer, ipcMain } = require('electron');
const path = require('path');
//const Tesseract = require('tesseract.js');

// fps and performance shit
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('enable-accelerated-2d-canvas'); // this is not really needed

let mainWindow;
let overlay;

function createWindows() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'Bloxd',
        frame: true,
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'assets/icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            backgroundThrottling: false// add this shit too
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL('https://bloxd.io/');
    //mainWindow.webContents.openDevTools(); //dev tools for debugging


    mainWindow.webContents.on('will-prevent-unload', (event) => {
        event.preventDefault();
    });

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
    overlay.setAlwaysOnTop(true, 'screen-saver');

    function syncOverlay() {
        if (!mainWindow || !overlay) return;

        const bounds = mainWindow.getBounds();
        overlay.setBounds(bounds, false);
    }

    mainWindow.on('move', syncOverlay);
    mainWindow.on('will-move', syncOverlay);
    mainWindow.on('moved', syncOverlay);
    mainWindow.on('resize', syncOverlay);
    mainWindow.on('will-resize', syncOverlay);

    let lastURL = null;

    function sendCurrentURL(url) {
        if (!overlay || overlay.isDestroyed()) return;
        if (url === lastURL) return;

        lastURL = url;
        overlay.webContents.send('current-url', url);
    }

    mainWindow.webContents.on('did-navigate', (_event, url) => {
        sendCurrentURL(url);
    });

    mainWindow.webContents.on('did-navigate-in-page', (_event, url) => {
        sendCurrentURL(url);
    });

    mainWindow.webContents.on('did-finish-load', () => {
        sendCurrentURL(mainWindow.webContents.getURL());
    });

    overlay.webContents.on('did-finish-load', () => {
        sendCurrentURL(mainWindow.webContents.getURL());
    });
    mainWindow.on('closed', () => {
        if (overlay) {
            overlay.close();
            overlay = null;
        }
        mainWindow = null;
    });

    mainWindow.on('minimize', () => {
        overlay?.minimize();
    });

    mainWindow.on('restore', () => {
        overlay?.restore();
    });

    mainWindow.on('blur', () => {
        overlay?.hide();
    });

    mainWindow.on('focus', () => {
        overlay?.showInactive();
    });


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

        // require('fs').writeFileSync('debug.png', cropped.toPNG());// this is for debugging if you are getting nothing enable it and see the png it make to see where the ocr is looking at

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
