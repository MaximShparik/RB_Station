<template>
  <li>
    <input v-for='(playsholder,i) of GetPlaysholders'
            v-bind:key='playsholder'
            v-bind:placeholder='playsholder'
            v-on:change='MassEdit({
              "val":$event.target.value,
              "numofinput":i,
              "numoftask":numOfTasks
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
    GetPlaysholders(){
      return this.$store.getters.GetConfigs.UserData[this.$store.getters.GetConfigs.UserData.currentMode].playsholders
    },
  },
  methods: {
    ...mapMutations([
      'MassEdit'
    ])
  },
  props:{
    numOfTasks: Array
  }

}
</script>

<style scoped>
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
  input:nth-child(3n+2){
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
  li{
    margin: 0;
    box-shadow: none;
    filter: blur(2px);
  }
</style>
