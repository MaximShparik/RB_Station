<template>
  <header ref="header">
    <button
      @click='massEdit'
      v-if='GetCurrentMode!=="Mails"'
      style='grid-column-start:2;'
      >Mass edit
    </button>
    <button
      v-if='GetCurrentMode!=="Mails"'
      @click='ClearAll()'
      style='grid-column-start:4;margin-left:auto;'
      >Clear all
    </button>
    <div>
      <MassEdit/>
    </div>
  </header>
</template>

<script>
import MassEdit from './MassEdit.vue'
import {mapMutations} from 'vuex'

export default {
  computed:{
    GetCurrentMode(){
      return this.$store.getters.GetConfigs.UserData.currentMode
    },
  },
  methods: {
    massEdit(){
      document.querySelector('button').style.filter = "blur(2px)"
      document.querySelector('ul').style.filter = "blur(2px)"
      document.querySelector('.mode').style.filter = "blur(2px)"
      document.querySelector('body').style.overflow = "hidden"
      document.querySelector('button').style.pointerEvents = 'none'
      document.querySelector('ul').style.pointerEvents = 'none'
      document.querySelector('.mode').style.pointerEvents = 'none'
      document.querySelector('.mass_edit').style.pointerEvents = 'auto'
      document.querySelector('.mass_edit').style.filter = 'none'
      document.querySelector('.mass_edit').style.display = 'block'
    },
    ...mapMutations([
      'ClearAll'
    ])
  },
  components: {
    MassEdit,
  }
}
</script>

<style scoped>
header {
  position: fixed;
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  z-index: 10;
}

button{
  background-color: rgba(#e0eaf4, 0.9);
  color: black;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 0 10px rgba(135, 135, 138);
  border: none;
  outline: none;
  height: 30px;
  letter-spacing: 1px;
  text-align: center;
  width: 15vw;
  max-width: 110px;
}
button:first-child{
  border-bottom-right-radius: 10px;
}
button:nth-child(2){
  border-bottom-left-radius: 10px;
}
</style>
