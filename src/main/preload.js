const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    async uploadMP3File(filename) {
      const tags = await ipcRenderer.invoke('uploadMP3File', filename);
      return tags;
    },
  },
});
