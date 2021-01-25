import Vue from 'vue'
import Vuex from 'vuex'
import configs from './modules/configs'
import stock from './modules/stock'
import proxy from './modules/proxy'
// import path from 'path'
// import fs from 'fs'
// var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/config/config.json'), 'utf-8'))

// import config from '../config/config.json'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  //   configs: config
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    configs,
    stock,
    proxy
  }
})
