const { ipcRenderer: ipc } = require("electron");

// handle window
const toggleFullscreen = (_) => ipc.invoke("toggle-fullscreen");
const minimize = (_) => ipc.invoke("app-minimize");
const maximize = (_) => ipc.invoke("app-maximize");
// quit application
const quit = (_) => ipc.invoke("app-quit");
// handle external links
const externalLink = (href) => ipc.invoke("external-link", href);

// Letters methods
const getLetters = () => ipc.invoke("getLetters");
const loadLetters = () => ipc.invoke("loadLetters");

// exports
module.exports = {
  quit,
  minimize,
  maximize,
  toggleFullscreen,
  externalLink,
  getLetters,
  loadLetters,
};
