import { localStorageKey } from '../utils/utils';

export default function DownloadButton() {
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([localStorage.getItem(localStorageKey)],
      { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "myContactNotes.txt";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <button onClick={downloadTxtFile} className="import-button">Download</button>
  );
}