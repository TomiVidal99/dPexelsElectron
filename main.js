const electron = require('electron')

const { app, BrowserWindow } = require('electron')

let mainWindow;

function createWindow () {
  // Create the browser window.
  return( win = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  }))
  
}

app.on('ready', () => {
  mainWindow = createWindow()    
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  //mainWindow.setMenu(null)

})



