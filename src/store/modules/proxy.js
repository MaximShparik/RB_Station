import proxy from '../../config/proxy.json'
import fs from 'fs'

function WriteNewProxy(proxy){

  fs.writeFileSync('./src/config/proxy.json', JSON.stringify(proxy, null, 2))
}

export default {
  state: {
    proxy: proxy
  },
  mutations: {
    ChangeProxy(state,data){
      data = data.split('\n')
      state.proxy = []
      for(let i=0;i<data.length;i++){
        if(data[i]!=''){
          let obj = {
            Proxy:data[i],
            Cookie:{}
          }
          state.proxy.push(obj)
        }
      }
      WriteNewProxy(state.proxy)
    }
  },
  getters: {
    GetProxy(state){
      let data = []
      for(let i=0;i<state.proxy.length;i++){
        data.push(state.proxy[i].Proxy)
      }
      data = data.toString()
      data = data.replace(/,/g, '\n')
      return data
    }
  }
}
