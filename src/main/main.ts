/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import fs from 'fs';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import ElectronStore from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const schema = {
  configPage: {
    type: 'string',
  },
};

const store = new ElectronStore();

/*export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}*/

let mainWindow: BrowserWindow | null = null;

store.onDidChange('configPath', (value) =>
  mainWindow?.setTitle(value ? `${value}` : 'XMRig Made Easy')
);

const saveConfig = (filePath: string, content: string) => {
  store.set('configPath', filePath);
  fs.writeFileSync(path.normalize(filePath), content);
};

const saveAsDialog = async (content: string) => {
  const ret = await dialog.showSaveDialog({
    title: 'Save XMRIG Configuration',
    filters: [{ name: 'JSON', extensions: ['json'] }],
    defaultPath: 'config.json',
  });
  if (ret && !ret.canceled && ret.filePath) {
    saveConfig(path.normalize(ret.filePath), content);
  }
};

ipcMain.on('save-dialog', async (event, arg) => {
  await saveAsDialog(arg.content);
});

ipcMain.on('save-config', async (event, arg) => {
  if (store.has('configPath')) {
    saveConfig(
      path.normalize(store.get<string>('configPath') as string),
      arg.content
    );
  } else {
    await saveAsDialog(arg.content);
  }
});

ipcMain.on('new-config', (event) => {
  store.delete('configPath');
});

ipcMain.handle('load-dialog', async (event) => {
  const ret = await dialog.showOpenDialog({
    title: 'Open XMRIG Configuration',
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });
  if (ret && !ret.canceled && ret.filePaths[0]) {
    try {
      store.set('configPath', ret.filePaths[0]);
      return fs.readFileSync(ret.filePaths[0]).toString();
    } catch (er) {
      return null;
    }
  }
  return null;
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1300,
    minWidth: 1300,
    height: 728,
    minHeight: 728,
    icon: getAssetPath('icon.png'),
    title: 'XMRig Made Easy',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/main/docs/api/browser-window.md#using-ready-to-show-event
  /*mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });*/

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    mainWindow?.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  //new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
