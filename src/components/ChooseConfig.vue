<template>
  <div class='saveconfig'>
    <div>
      <button @click='DisplayBlock("stock-area")'>Stock</button>
      <button @click='DisplayBlock("config")'>Config</button>
      <button @click='DisplayBlock("proxy")'>Proxy</button>
      <input placeholder="Webhook"
      v-bind:value='GetWebhook'
      v-on:change='ChangeWebhook($event.target.value)'
      >
      <hr>
      <p>Save as</p>
      <input v-model='nameofprofile' type="text" placeholder="Name of profile" >
      <p>Choose config<br>for save</p>
      <select v-model="selected">
        <option  v-for="name in GetNamesConfigs"  :key="name" :value='name'>{{name}}</option>
      </select>
      <button
      v-on:click='SaveOnServer({
        name: nameofprofile,
        selected: selected
        })'
      >Save on server</button>
    </div>
    <hr>
    <div style="overflow: auto;">
      <p>Load From</p>
      <button v-for="(ConfigName,i) in Object.keys(GetSaveConfig)"
      :key="i"
      v-on:click='SetSaveConfig(ConfigName)'
      v-on:dblclick='DeleteConfig(ConfigName)'
      >{{ConfigName}}</button>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex'

export default {
  data(){
    return{
      nameofprofile:'',
      selected: ''
    }
  },
  computed:{
    GetSaveConfig(){
      return this.$store.getters.GetSaveConfig
    },
    GetNamesConfigs(){
      let names = this.$store.getters.GetConfigs.UserData.allModes
      return names
    },
    GetWebhook(){
      return this.$store.getters.GetConfigs.UserData.webhook
    },
  },
  methods: {
    ...mapMutations(['ChangeWebhook','SetSaveConfig']),
    ...mapActions(['SaveOnServer','DeleteConfig']),
    DisplayBlock(id){
      for (let elem of document.querySelectorAll('.config_page')){
        elem.style.display = 'none'
      }
      if(id=='stock-area'){
        document.getElementById(id).style.display = 'grid'
      } else {
        document.getElementById(id).style.display = 'block'
      }

    }

  }
}
</script>

<style scoped>
.saveconfig {
  overflow: scroll;
  display: flex;
  background: white;
  padding: 15px 15px;
  list-style-type: none;
}
div{
  display: flex;
  flex-direction: column;
}
p{
  text-align: center;
  user-select: none;
  margin: 5px;
}
select{
  padding-left: 10px;
}
input,select{
  border: 2px solid #b1bac2;
}
button,input,select{
  text-align: center;
  width: 90%;
  margin: 10px auto;
  cursor: pointer;
  min-height: 30px;
  border-radius:10px;
  outline: none;
}
button{
  background-color: rgba(#e0eaf4, 0.9);
  border: none;
}
hr{
  width: 100%;
  color: #b1bac2;
}

</style>
