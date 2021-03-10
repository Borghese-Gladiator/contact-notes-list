// Styling input type file button: https://stackoverflow.com/questions/572768/styling-an-input-type-file-button
function getFile(event) {
  const input = event.target
  if ('files' in input && input.files.length > 0) {
    // add file content to localStorage
    // input.files[0] => file object - name, size, lastModified, etc.
    readFileContent(input.files[0]).then(content => {
      localStorage.setItem('listSongLists', content);
      window.location.reload()
    }).catch(error => console.log(error))
  }
}

function readFileContent(file) {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

export default function UploadButton() {
  return (
    <div onChange={getFile} className="flex-button-group">
      <label className="upload-input">
        <input type="file" />
        Upload
      </label>
    </div>
  )
}