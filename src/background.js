import { app, protocol, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const axios = require('axios')
const path = require('path')
const url = require('url')
const https = require('https')
const fs = require('fs')
// var config
// console.log(config)

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

var mainwin



function createWindow() {


  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    // icon: 'public/favicon.png',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      webSecurity:false,
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  win.on('closed', ()=>{
    // try {fs.unlinkSync(path.join(__dirname+'/../src/js/bot.js'))} catch (err) {console.log(err)}
    // import config from path.join(__dirname+'/../src/config/config.json')
    // config.UserData.isLoged = false
    // fs.writeFileSync(path.join(__dirname+'/../src/config/config.json'), JSON.stringify(config, null, 2))
    mainwin = null
    app.quit()
  })
  mainwin = win
}
ipcMain.on('end',(e,arg)=>{
  app.quit()
})
ipcMain.on('run',(e, x1, x2, x3)=>{
  // console.log(x1)
  // console.log(x2)
  if (x2 == 'Nike') {
    // try{
      let { bot_nike } = require('./js/bot.js')
    // } catch(e) {
    //   console.log(e)
    // }

    // let params = {click:false,click2:false,click3:false,sendwebhook:false,webhook:loged[0].webhook}
    //пофиксить вебхук

    let params = {click:false,click2:false,click3:false,sendwebhook:false}
    bot_nike([{...x1, ...params}])
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow()
  // try {fs.unlinkSync(path.join(__dirname+'/../src/js/bot.js'))} catch (err) {console.log(err)}
})



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
