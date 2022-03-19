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
import * as dotenv from 'dotenv';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import https from 'https';
import axios from 'axios';
import NodeID3 from 'node-id3';
import OnlineMetadataTag from '../renderer/types/onlineMetadataTag';
import Id3Tags from '../renderer/types/id3Tags';
import { resolveHtmlPath } from './util';
import MenuBuilder from './menu';

dotenv.config({ path: `${__dirname}/.env` });

const httpsAgent: https.Agent = new https.Agent({
  rejectUnauthorized: false,
});

axios.defaults.httpsAgent = httpsAgent;

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.handle(
  'uploadMP3File',
  async (event: Electron.IpcMainInvokeEvent, filename: string) => {
    const tags = await NodeID3.read(filename);
    return tags;
  }
);

ipcMain.handle(
  'updateMP3Tags',
  async (
    event: Electron.IpcMainInvokeEvent,
    filePath: string,
    fileName: string,
    tags: NodeID3.Tags,
    lyrics: string
  ) => {
    // Convert Uint8Array to Buffer
    if (tags.image && typeof tags.image !== 'string') {
      const buff: Buffer = Buffer.from(tags.image.imageBuffer);
      tags.image.imageBuffer = buff;
    }

    tags.unsynchronisedLyrics = {
      language: '   ',
      shortText: undefined,
      text: lyrics,
    };

    await NodeID3.update(tags, filePath);

    const oldFileName: string = path.parse(filePath).dir;
    const newFilePath = `${oldFileName}/${fileName}`;

    fs.renameSync(filePath, newFilePath);

    event.sender.send('notification', {
      type: 'success',
      message: 'Mp3 file updated successfully.',
    });

    return newFilePath;
  }
);

ipcMain.handle(
  'uploadMP3CoverPhoto',
  async (event: Electron.IpcMainInvokeEvent, filePath: string) => {
    // Upload the image and convert it to a buffer
    const coverPhotoFile: Buffer = fs.readFileSync(filePath);
    event.sender.send('notification', {
      type: 'success',
      message: 'Cover photo uploaded successfully.',
    });
    return Buffer.from(coverPhotoFile);
  }
);

ipcMain.handle(
  'searchMetadata',
  async (_, query: string): OnlineMetadataTag[] => {
    return axios
      .get(`https://api.deezer.com/search?q="${query}"`)
      .then((res) => {
        let foundMetadatas: OnlineMetadataTag[] = [];

        res.data.data.forEach((elem) => {
          const onlineMetadataTag: OnlineMetadataTag = {};

          if (elem.id) onlineMetadataTag.id = elem.id;

          if (elem.title) onlineMetadataTag.title = elem.title;

          if (elem.artist && elem.artist.name)
            onlineMetadataTag.artist = elem.artist.name;

          if (elem.album) {
            if (elem.album.title) onlineMetadataTag.album = elem.album.title;

            if (elem.album.cover_xl) {
              onlineMetadataTag.image = elem.album.cover_xl;
            } else if (elem.album.cover_big) {
              onlineMetadataTag.image = elem.album.cover_big;
            } else if (elem.album.cover_medium) {
              onlineMetadataTag.image = elem.album.cover_medium;
            } else if (elem.album.cover_small) {
              onlineMetadataTag.image = elem.album.cover_small;
            } else if (elem.album.cover) {
              onlineMetadataTag.image = elem.album.cover;
            }
          }

          foundMetadatas = [...foundMetadatas, onlineMetadataTag];
        });

        return foundMetadatas;
      })
      .catch((err) => console.log(err));
  }
);

ipcMain.handle(
  'getMetadataById',
  async (
    event: Electron.IpcMainInvokeEvent,
    onlineMetadata: OnlineMetadataTag
  ): Id3Tags => {
    const id3Tag: Id3Tags = {};

    event.sender.send('notification', {
      type: 'info',
      message: 'Applying the selected metadata. Please wait...',
    });

    try {
      // Get track info
      const trackRes = await axios.get(
        `https://api.deezer.com/track/${onlineMetadata.id}`
      );

      id3Tag.artist = onlineMetadata.artist;
      id3Tag.title = onlineMetadata.title;
      id3Tag.album = onlineMetadata.album;

      if (trackRes.data.track_position) {
        id3Tag.trackNumber = trackRes.data.track_position;
      }

      // Get album info
      const albumRes = await axios.get(
        `https://api.deezer.com/album/${trackRes.data.album.id}`
      );

      let genres = '';
      if (
        albumRes.data.genres &&
        albumRes.data.genres.data &&
        albumRes.data.genres.data.length >= 1
      ) {
        albumRes.data.genres.data.forEach((aGenre) => {
          genres += `${aGenre.name}/`;
        });
      }
      id3Tag.genre = genres.substring(0, genres.length - 1);

      if (albumRes.data.nb_tracks) {
        id3Tag.trackNumber = `${id3Tag.trackNumber}/${albumRes.data.nb_tracks}`;
      }

      if (albumRes.data.release_date) {
        id3Tag.year = albumRes.data.release_date;
      }

      // Get the cover image
      if (onlineMetadata.image) {
        const imageBuff = await axios.get(onlineMetadata.image, {
          responseType: 'arraybuffer',
        });
        onlineMetadata.image = {
          imageBuffer: imageBuff.data,
        };

        id3Tag.image = onlineMetadata.image;
      }
    } catch (error) {
      console.log(error);
    }

    event.sender.send('notification', {
      type: 'success',
      message: 'Applied the selected metadata.',
    });

    return id3Tag;
  }
);

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
    width: 1024,
    height: 728,
    title: 'MP3 Tagger',
    backgroundColor: '#2E3440',
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
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
  new AppUpdater();
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
