<template>
  <div>
    <button v-for='(mode,i) of GetModes'
    v-bind:key='i'
    v-bind:id='mode'
    v-on:click='UpdateMode(mode)'
    >{{mode}}
  </button>
</div>
</template>

<script>
// import {ipcRenderer}  from 'electron'
import {mapMutations} from 'vuex'

export default {
  // computed: mapGetters(['GetConfigs']),
  computed:{
    // GetCurrentMode(){
    //   return this.$store.getters.GetConfigs.UserData.currentMode
    // },
    GetModes(){
      return this.$store.getters.GetConfigs.UserData.allModes
    }
  },

  methods: {
    // ...mapActions(['SetMode']),
    ...mapMutations(['UpdateMode'])
    // changeMode(mode){
    //   this.SetMode(mode)
    // }
  },
  // test(mode){
  //   this.setMode(mode)
  // },
  // methods: {
  //   test(mode){
  //     this.setMode(mode)
  //   }
  // },

  // mounted(){
  //   // this.$store.dispatch('FetchConfigs')
  //   this.SetMode(GetModes)
  // },
  // async mounted(){
  //   // this.$store.dispatch('FetchConfigs')
  //   this.SetMode(123)
  // },

  // methods: {
  //   setMode(mode){
  //     ipcRenderer.send('set',mode)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  button{
    max-width: 140px;
    margin: 0 15px;
    margin-bottom: 15px;
    box-shadow: 0 0 10px rgba(135, 135, 138);
    width: 30%;
    background-color: rgba(#e0eaf4, 0.9);
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    border-radius:10px;
    outline: none;
    height: 30px;
    letter-spacing: 1px;
    text-align: center;
  }
</style>
