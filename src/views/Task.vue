<template>
  <li>
    <button>{{index+1}}</button>
    <!-- <button>{{taskid}}</button> -->
    <button v-for='(btn,i) of GetSetups.btns'
            v-bind:key='i'
            v-bind:id='btn'
            v-on:click='TaskAction({
              "action":$event.target.id,
              "id":taskid
            })'
            >{{btn}}</button>
    <input v-for='(playsholder,i) of GetPlaysholders'
            v-bind:key='playsholder'
            v-bind:placeholder='playsholder'
            v-bind:value='Object.values(GetConfig[index])[i+1]'
            v-on:change='ChangeTask({
              "val":$event.target.value,
              "id":taskid,
              "key":Object.keys(GetConfig[index])[i+1]
            })'
    />
  </li>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  computed:{
    GetConfig(){
      return this.$store.getters.GetConfigs[this.$store.getters.GetConfigs.UserData.currentMode]
    },
    GetSetups(){
      return this.$store.getters.GetConfigs.UserData
    },
    GetPlaysholders(){
      return this.$store.getters.GetConfigs.UserData[this.$store.getters.GetConfigs.UserData.currentMode].playsholders
    },
  },
  methods: {
    ...mapMutations([
      'ChangeTask',
      'TaskAction'
    ])
  },
  props: {
    index:Number,
    taskid:Number
  },
}
</script>

<style scoped>
  button{
    /* font-family: 'Comfortaa', cursive; */
    margin-bottom: 15px;
    width: 30%;
    margin-right: 5%;
    background-color: rgba(#e0eaf4, 0.9);
    color: black;
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    border-radius:10px;
    border: none;
    outline: none;
    height: 30px;
    letter-spacing: 1px;
    text-align: center;
  }
  button:nth-child(1){
    width: 30px;
    cursor: auto;
  }
  button:nth-child(2){
    width: calc(95% - 30px);
    margin-right: 0%;
  }
  button:nth-child(5){
    margin-right: 0;
  }
  button {
    cursor: pointer;
  }
  button:nth-of-type(1),button:nth-of-type(2)  {
    cursor: auto;
    pointer-events: none;
  }
  li{
    margin: 25px auto 0;
    list-style-type: none;
    padding: 0px 0px 10px;
    background: white;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 0 10px rgba(135, 135, 138);
  }
  input{
    width: 32%;
    margin-bottom: 10px;
    height: 25px;
    line-height: 33px;
    border: none;
    border-bottom: 1px solid lightgrey;
    background: transparent;
    outline: none;
    /* font-family: 'Comfortaa', cursive; */
    text-align: center;
  }
  input:nth-child(3n+1){
    margin-right: 2%;
    margin-left: 2%;
  }
  input:last-child{
    margin-bottom: 0;
  }
  .Nike li input:nth-of-type(10),.Nike li input:nth-of-type(11){
    margin-right: 5%;
    margin-left: 5%;
    width: 90%;
  }
  .task button{
    display: none;
  }
  .task li{
    margin: 0;
    box-shadow: none;
    filter: blur(2px);
  }
</style>
