import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

let win: BrowserWindow | null = null;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000/'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
