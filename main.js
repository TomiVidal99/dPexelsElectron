const electron = require('electron')
const { app, BrowserWindow, dialog, ipcMain } = require('electron')

let mainWindow;

function createWindow () {
  // Create the browser window.
  return( win = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    icon: "./icon64.png"
  }))
  
}

app.on('ready', () => {

  mainWindow = createWindow()    
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.setMenu(null)
  mainWindow.setResizable(false)
  //mainWindow.toggleDevTools();

})

ipcMain.on('selectDirectory', (event, arg) => {
    dialog.showOpenDialog(mainWindow, {
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePaths)
      if (result.filePaths) {
        event.reply('path-selected', result.filePaths)
      } else {
        event.reply('path-selected', "No path selected")
      }
    }).catch(err => {
      console.log(err)
    })
});

/*
function selectDirectory() {
  let dir = dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  return(dir);
}

*/