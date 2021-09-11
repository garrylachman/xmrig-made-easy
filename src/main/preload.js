const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    saveDialog(content) {
      ipcRenderer.send('save-dialog', content);
    },
    saveConfig(content) {
      ipcRenderer.send('save-config', content);
    },
    newConfig() {
      ipcRenderer.send('new-config');
    },
    async loadDialog() {
      const ret = await ipcRenderer.invoke('load-dialog');
      return ret;
    },
    on(channel, func) {
      const validChannels = ['save-dialog'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
