<template>
  <div>
    <input v-model='val' type="text" placeholder="Your Key">
    <button v-on:click="FetchLogin(val)">Log In</button>
  </div>
</template>

<script>
// import {ipcRenderer}  from 'electron'
import {mapActions} from 'vuex'

export default {
  data(){
    return{
      val:''
    }
  },
  methods: {
    ...mapActions([
      'FetchLogin'
    ]),
  },
}
</script>

<style scoped>
  div{
    width: 100%;
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 40vh;
  }
  input{
    width: 30%;
    min-width: 150px;
    margin: 0 auto;
    height: 25px;
    line-height: 33px;
    border: none;
    background: transparent;
    outline: none;
    text-align: center;
  }
  button{
    width: 100px;
    margin: 20px auto;
    background-color: rgba(#e0eaf4, 0.9);
    cursor: pointer;
    border-radius:10px;
    border: none;
    outline: none;
    height: 30px;
    letter-spacing: 1px;
    text-align: center;
    text-transform: uppercase;
  }
</style>
