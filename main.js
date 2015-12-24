var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 625, 'min-width': 800, 'min-height':400 });
  
  mainWindow.setMenu(null);
  //mainWindow.openDevTools();

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  
  ipc.on('show-folder-dialog', function(event, args){
    var wallpaperPath = require('dialog').showOpenDialog({ properties: [ 'openDirectory' ]});
    console.log(wallpaperPath);
    event.sender.send('folder-selected', wallpaperPath);
  });
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});