<template>
  <div class="mails__content">
    <div class="mails__type">
      <button id='mails-gmail' type="button" name="button">Gmail</button>
      <button id='mails-mailru' type="button" name="button">Mail Ru</button>
    </div>
    <div class="mails__inputs">
      <div id='inputs-gmail'>
        <button id='run' type="button" name="button">Run</button>
        <input
          v-for="(input,i) in GetInputs"  :key="i"
          :placeholder='input'
          :value='Object.values(GetConfig[0])[i]'
          v-on:change='ChangeMail({
            "val":$event.target.value,
            "key":Object.keys(GetConfig[0])[i]
          })'
          type="text"
          >
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  computed:{
    GetConfig(){
      var config = this.$store.getters.GetConfigs.Mails
      return config
    },
    GetInputs(){
      return this.$store.getters.GetConfigs.UserData[this.$store.getters.GetConfigs.UserData.currentMode].playsholders
    }
  },
  methods: {
    ...mapMutations([
      'ChangeMail'
    ])
  },
}
</script>

<style scoped>
  .mails__content{
    position: fixed;
    top: 90px;
    width: 90vw;
    /* height: calc(100vh - 200px); */
    height: 470px;
    left: 5vw;
    display: flex;
    background-color: #fff;
    border-radius: 15px;
    padding: 15px 0;
    padding-top: 30px;
  }
  button{
    /* font-family: 'Comfortaa', cursive;
    margin-bottom: 15px; */
    width: 30%;
    margin: 0 auto;
    /* margin-right: 5%; */
    background-color: rgba(#e0eaf4, 0.9);
    /* color: black; */
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    border-radius:10px;
    /* border: none; */
    outline: none;
    height: 30px;
    letter-spacing: 1px;
    text-align: center;
  }
  .mails__type{
    width: 200px;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .mails__type button{
    width: 140px;
    margin: 15px;
    margin-top: 0;
    cursor: pointer;
  }
  .mails__inputs{
    position: relative;
  }
  .mails__inputs div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: calc(90vw - 200px);
    position: absolute;
    /* top: 50%;
    transform: translateY(-50%); */
  }
  .mails__inputs input{
    margin: 10px auto;
    width: 80%;
    height: 25px;
    line-height: 33px;
    border: none;
    border-bottom: 1px solid lightgrey;
    background: transparent;
    outline: none;
    font-family: 'Comfortaa', cursive;
    text-align: center;
  }
  .mails__inputs input:last-child{
    margin-bottom: 25px;
  }
</style>
