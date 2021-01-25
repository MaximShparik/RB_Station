<template>
  <textarea id='proxy' class="config_page" :value='GetProxy' v-on:change='ChangeProxy($event.target.value)'></textarea>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  computed:{
    GetProxy(){
      return this.$store.getters.GetProxy
    }
  },
  methods: {
    ...mapMutations(['ChangeProxy'])
  }
}
</script>

<style scoped>
  textarea{
    display: none;
    outline: none;
    font-size: 16px;
    padding: 20px;
    overflow: auto;
    border: none;
  }
</style>
