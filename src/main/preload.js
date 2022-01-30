const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    async uploadMP3File(filename) {
      const tags = await ipcRenderer.invoke('uploadMP3File', filename);
      return tags;
    },

    async updateMP3Tags(filename, tags) {
      await ipcRenderer.invoke('updateMP3Tags', filename, tags);
    },

    async uploadMP3CoverPhoto(filePath) {
      const coverPhotoBuffer = await ipcRenderer.invoke(
        'uploadMP3CoverPhoto',
        filePath
      );
      return coverPhotoBuffer;
    },

    async searchMetadata(query) {
      const res = await ipcRenderer.invoke('searchMetadata', query);
      return res;
    },

    async getMetadataById(onlineMetadata) {
      const res = await ipcRenderer.invoke('getMetadataById', onlineMetadata);
      return res;
    },

    notify(cb) {
      ipcRenderer.on('notification', (event, customData) => cb(customData));
    },
  },
});
