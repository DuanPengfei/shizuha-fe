const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  window.loadFile('index.html');
  window.maximize();
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const fileRootDir = path.resolve(os.homedir(), 'shizuha');

ipcMain.handle('file:list', () => {
  const names = fs.readdirSync(fileRootDir);
  const files = names.map((name) => {
    const filePath = path.join(fileRootDir, name);
    const fileStat = fs.statSync(filePath);
    return {
      name,
      path: filePath,
      isDirectory: fileStat.isDirectory(),
    }
  });

  return files;
});

ipcMain.handle('file:content', (e, filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent;
});
