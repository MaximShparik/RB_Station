import config from '../../config/config.json'
import saveconfig from '../../config/saveconfig.json'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { ipcRenderer } from 'electron'

function WriteNewConfig(config){
  fs.writeFileSync('./src/config/config.json', JSON.stringify(config, null, 2))
}
function GetRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export default {

  state: {
    configs: config,
    saveconfig: saveconfig
  },
  mutations: {
    UpdateMode(state, mode){
      state.configs.UserData.currentMode = mode
      WriteNewConfig(state.configs)
    },
    Login(state){
      state.configs.UserData.isLoged = true
      WriteNewConfig(state.configs)
    },
    ChangeTask(state, data){
      let config = state.configs[state.configs.UserData.currentMode]
      let num = config.findIndex(x => x.id === data.id)
      config[num][data.key] = data.val
      WriteNewConfig(state.configs)
    },
    TaskAction(state, data){
      let config = state.configs[state.configs.UserData.currentMode]
      let num = config.findIndex(x => x.id === data.id)
      if(data.action=='run'){
        ipcRenderer.send('run',config[num], state.configs.UserData.currentMode, num)
        // const bot_nike = require('../../js/bot.js')
        // const {bot_nike} = import('../../js/bot.js')
        // // './src/config/saveconfig.json'
        // let params = {click:false,click2:false,click3:false,sendwebhook:false}
        // bot_nike([{...config[num], ...params}])
      } else if (data.action=='x2') {
        let x2profile = {...config[num]}
        x2profile.id = GetRandom(100000,999999)
        config.push(x2profile)
        WriteNewConfig(state.configs)
      } else if (data.action=='delete') {
        if(config.length==1){
          Object.keys(config[0]).forEach(function(key){ config[0][key] = '' })
          config[0].id = GetRandom(100000,999999)
        } else {
          let delnum = config.map(function(item) { return item.id; }).indexOf(data.id);
          config.splice(delnum, 1)
        }
        WriteNewConfig(state.configs)
      }
    },
    ChangeWebhook(state, data){

      state.configs.UserData.webhook = data
      WriteNewConfig(state.configs)
    },
    ClearAll(state){
      let config_free = {...state.configs[state.configs.UserData.currentMode][0]}
      Object.keys(config_free).forEach(function(key){ config_free[key] = '' })
      config_free.id = GetRandom(100000,999999)
      state.configs[state.configs.UserData.currentMode] = []
      state.configs[state.configs.UserData.currentMode].push(config_free)
      WriteNewConfig(state.configs)
    },
    MassEdit(state,data){
      let config = state.configs[state.configs.UserData.currentMode]
      let keys = Object.keys(config[0])
      for(let i=0;i<data.numoftask.length;i++){
        for(let x=0;x<keys.length;x++){
          if(x==data.numofinput){
            config[data.numoftask[i]][keys[x+1]] = data.val
          }
        }
      }
      WriteNewConfig(state.configs)
    },
    ChangeConfig(state, data){
      state.configs = data
      WriteNewConfig(state.configs)
    },
    ChangeMail(state, data){
      state.configs.Mails[0][data.key] = data.val
      WriteNewConfig(state.configs)
    },
    SetLogin(state,data){
      state.configs.UserData.key = data
      state.configs.UserData.isLoged = true
      WriteNewConfig(state.configs)
    },
    Logout(state){
      state.configs.UserData.key = ''
      state.configs.UserData.isLoged = false
      WriteNewConfig(state.configs)
    },
    SetSaveConfig(state,data){
      let curent_config = Object.keys(state.saveconfig[data])[0]
      state.configs[curent_config] = state.saveconfig[data][curent_config]
      WriteNewConfig(state.configs)
    },
    DeleteConfigLocal(state,data){
      delete state.saveconfig[data]
      fs.writeFileSync('./src/config/saveconfig.json', JSON.stringify(state.saveconfig, null, 2))
    }
  },
  actions: {
    async FetchLogin(ctx,params){
      axios
      .get('http://138.68.103.240/file',{
        headers: {
          'AuthKey': params
        }
      })
      .then(res => {
        fs.writeFileSync('./src/js/bot.js', Buffer.from(res.data.file, 'base64').toString())
        fs.writeFileSync('./src/config/saveconfig.json', JSON.stringify(res.data.data, null, 2))
        ctx.commit('SetLogin',params)
      })
      .catch(e => {
        alert('Битый ключ, иди гуляй\nОшибка '+e)
      })
    },
    async FetchLogout(ctx,params){
      axios
      .get('http://138.68.103.240/sessions/logout',{
        headers: {
          'AuthKey': params
        }
      })
      .then(res => {
        ctx.commit('Logout')
        try {fs.writeFileSync('./src/js/bot.js','')} catch (err) {console.log(err)}
        res = ''
        alert('Покасики')
        ipcRenderer.send('end',res)
      })
      .catch(e => {
        // console.log(e)
        alert('Попробуй ещё раз\n'+e)
      })
    },
    async SaveOnServer(ctx,params){
      saveconfig[params.name] = {
        [params.selected]: config[params.selected]
      }
      fs.writeFileSync('./src/config/saveconfig.json', JSON.stringify(saveconfig, null, 2))
      let key = config.UserData.key
      axios
      .put('http://138.68.103.240/keys/data',saveconfig,{
        headers: {
          'AuthKey': key
        }
      })
      .then(res => {
        alert('Saved')
        console.log(res)
      })
      .catch(e => {
        alert('Попробуй ещё раз\n'+e)
      })
    },
    async DeleteConfig(ctx,params){
      let key = config.UserData.key
      axios
      .delete('http://138.68.103.240/keys/data/'+params,{
        headers: {
          'AuthKey': key
        }
      })
      .then(res => {
        alert('Deleted')
        ctx.commit('DeleteConfigLocal',params)
        console.log(res)
      })
      .catch(e => {
        alert('Попробуй ещё раз\n'+e)
      })
    }
  },
  getters: {
    GetConfigs(state){
      return state.configs
    },
    GetSaveConfig(state){
      return state.saveconfig
    }
  }
}
