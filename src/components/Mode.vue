<template>
  <div class="mode">
    <button v-for='(mode,i) of GetModes'
    v-bind:key='i'
    v-bind:id='mode'
    v-on:click='UpdateMode(mode)'
    >{{mode}}
  </button>
  <button class='logout' v-on:dblclick='FetchLogout(GetKey)'>Log Out</button>
</div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex'

export default {
  computed:{
    GetKey(){
      return this.$store.getters.GetConfigs.UserData.key
    },
    GetModes(){
      return this.$store.getters.GetConfigs.UserData.allModes
    }
  },

  methods: {
    ...mapMutations(['UpdateMode']),
    ...mapActions(['FetchLogout']),
  },
}
</script>

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
  .logout{
    box-shadow: 0 0 10px rgba(246, 147, 125, 0.79);
  }
</style>
