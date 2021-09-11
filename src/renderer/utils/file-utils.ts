/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

export const saveAsDialog = async (content: string) => {
  (window as any).electron.ipcRenderer.saveDialog({
    content,
  });
};

export const saveConfig = async (content: string) => {
  (window as any).electron.ipcRenderer.saveConfig({
    content,
  });
};

export const newConfig = () => {
  (window as any).electron.ipcRenderer.newConfig();
};

export const loadConfig = async () => {
  const content = await (window as any).electron.ipcRenderer.loadDialog();
  console.log("content", content)
  return content;
};
