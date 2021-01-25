<template>
  <textarea id='config' class="config_page" :value='GetConfig' v-on:change='ChangeConfig(JSON.parse($event.target.value))'></textarea>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  computed:{
    GetConfig(){
      let config = JSON.stringify(this.$store.getters.GetConfigs, undefined, 4)
      return config
    }
  },
  methods: {
    ...mapMutations(['ChangeConfig'])
  }
}
</script>

<style scoped>
  textarea{
    display: none;
    font-size: 16px;
    margin: 0;
    padding: 20px;
    border: none;
    overflow: auto;
  }
</style>
