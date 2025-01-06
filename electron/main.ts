import { app, BrowserWindow, ipcMain, shell } from 'electron';
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    width: 1280,
    height: 832,
    minWidth: 790,
    minHeight: 832,
    trafficLightPosition: { x: 24, y: 25 },
    icon: path.join(process.env.VITE_PUBLIC, 'isotype-desktop.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    // If the URL is external, open it in the default OS browser
    if (url.startsWith('http')) {
      shell.openExternal(url);
      return { action: 'deny' }; // Prevent opening a new Electron window
    }
    return { action: 'allow' }; // Allow other internal links (if any)
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle custom window control events
ipcMain.on('window-control', (_, action) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (!focusedWindow) return; // Ensure a window is focused

  switch (action) {
    case 'minimize':
      focusedWindow.minimize();
      break;
    case 'maximize':
      if (focusedWindow.isMaximized()) {
        focusedWindow.unmaximize();
      } else {
        focusedWindow.maximize();
      }
      break;
    case 'close':
      focusedWindow.close();
      break;
    default:
      console.warn(`Unknown action: ${action}`);
  }
});

app.whenReady().then(createWindow);
