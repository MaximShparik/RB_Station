<template>
  <divs>
    <ChooseConfig/>
    <Config/>
    <Stock/>
    <Proxy/>
  </divs>
</template>

<script>
import ChooseConfig from '../components/ChooseConfig.vue'
import Config from '../components/Config.vue'
import Stock from '../components/Stock.vue'
import Proxy from '../components/Proxy.vue'

export default {


  components: {
    Config,
    Stock,
    Proxy,
    ChooseConfig
  },
}
</script>

<style scoped>
  divs{
    position: fixed;
    top: 0;
    height: calc(100vh - 60px);
    /* background: white; */
    display: grid;
    grid-template-columns: 1fr 4fr;
    width: 100%;

  }
</style>
