<template>
  <div>
    <ul>
      <Task v-for='(config,i) of GetConfig'
                v-bind:key='i'
                v-bind:index='i'
                v-bind:taskid='GetConfig[i].id'/>
    </ul>
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  computed:{
    GetConfig(){
      var config = this.$store.getters.GetConfigs.Nike
      return config
    }
  },
  components: {
    Task
  }
}
</script>
