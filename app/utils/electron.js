// Electron specific functions and actions
import { remote } from 'electron';

export default function getSignatureSavePath() {
  return remote.dialog.showSaveDialog({
    title: 'Save IRMA signature request',
    filters: [
      { name: 'IRMA Files', extensions: ['irma'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
}
