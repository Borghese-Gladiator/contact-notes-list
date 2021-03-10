export default function DownloadButton() {
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([localStorage.getItem('listSongLists')],
      { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "mySongLists.txt";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <button onClick={downloadTxtFile} className="import-button">Download</button>
  );
}