<template>
  <div class="mass_edit" v-bind:class='GetCurrentMode'>
    <div class="checkboxes">
      <div class="checkboxes_buttons">
        <button @click='close'>close</button>
        <button @click='checkAll'>all</button>
        <button @click='clearAll'>clear</button>
      </div>
      <div class="checkboxes_inputs">
        <div v-for='(checkbox,i) of GetConfigLenght' v-bind:key='i'>
          <label :for='i'>{{i+1}}</label>
          <input type="checkbox"
              v-on:change='checkBox'
              @click='saveNumTask(i)'
              :id='i'
          >
        </div>

      </div>
    </div>
    <div class="task">
      <MasseditTask v-bind:index='1'
                    v-bind:numOfTasks='numOfTasks'
      />
      <div class="messege" v-if='checdedBox==false'>Сhoose tasks for edit</div>
    </div>
  </div>
</template>

<script>
import MasseditTask from './MasseditTask.vue'

export default {

  data(){
    return{
      checdedBox:false,
      numOfTasks: []
    }
  },
  computed:{
    GetConfigLenght(){
      return this.$store.getters.GetConfigs[this.$store.getters.GetConfigs.UserData.currentMode]
    },
    GetCurrentMode(){
      return this.$store.getters.GetConfigs.UserData.currentMode
    },
  },
  methods: {
    checkAll(){
      let check = document.querySelectorAll('.checkboxes_inputs input')
      for(let i=0;i<check.length;i++){
        check[i].checked = true
        this.numOfTasks.push(i)
      }
      this.checkBox()
    },
    clearAll(){
      let check = document.querySelectorAll('.checkboxes_inputs input')
      for(let i=0;i<check.length;i++){
        check[i].checked = false
      }
      this.numOfTasks=[]
      this.checkBox()
    },
    close(){
      document.querySelector('.mass_edit').style.display = 'none'
      document.querySelector('button').style.filter = "none"
      document.querySelector('ul').style.filter = "none"
      document.querySelector('.mode').style.filter = "none"
      document.querySelector('body').style.overflow = "auto"
      document.querySelector('button').style.pointerEvents = 'auto'
      document.querySelector('ul').style.pointerEvents = 'auto'
      document.querySelector('.mode').style.pointerEvents = 'auto'
    },
    checkBox(){
      if(document.querySelectorAll('.checkboxes_inputs input:checked').length!==0){
        document.querySelector('.task li').style.filter = 'none'

        this.checdedBox = true
      } else {
        document.querySelector('.task li').style.filter = 'blur(2px)'
        this.checdedBox = false
      }
    },
    test(){
      console.log('work')
    },
    saveNumTask(i){
      if(this.numOfTasks.includes(i)){
        let delnum = this.numOfTasks.map(function(i) { return i; }).indexOf(i)
        this.numOfTasks.splice(delnum, 1)
      } else {
        this.numOfTasks.push(i)
      }
    }
  },
  components: {
    MasseditTask
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button{
  margin-bottom: 15px;
  background-color: rgba(#e0eaf4, 0.9);
  color: black;
  cursor: pointer;
  text-transform: uppercase;
  border: none;
  border-radius:10px;
  border: none;
  outline: none;
  height: 30px;
  letter-spacing: 1px;
  text-align: center;
}
.mass_edit.Adidas{
  height: 355px;
}
.mass_edit{
  display: none;
  position: fixed;
  left: 50vw;
  top: 50vh;
  transform: translateX(-50%) translateY(-50%);
  /* display: flex; */
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 15px;
  /* padding: 15px; */
  box-shadow: 0 0 10px rgba(135, 135, 138);
  width: 50vw;
  height: 345px;
  min-width: 700px;
  z-index: 1;
}
.checkboxes{
  display: flex;
  height: 150px;
  /* flex-direction: column; */
}
.checkboxes_buttons{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 140px;
}
.checkboxes_buttons button{
  width: 75%;
  margin: 0px auto;
}
.checkboxes_inputs{
  display: flex;
  justify-content: space-around;
  margin-left: 10px;
  margin-top: 15px;
  margin-right: 0;
  margin-bottom: 10px;
  width: 75%;
  flex-wrap: wrap;
  overflow: auto;
}
.checkboxes_inputs div{
  height: 30px;
  display: flex;
}
.checkboxes_inputs input{
  width: 20px;
  height: 20px;
  margin: 0;
  margin-right: 15px;
  cursor: pointer;
}
.checkboxes_inputs label{
  text-align: center;
  line-height: 22px;
  margin-right: 4px;
  width: 20px;
  cursor: pointer;
}
.task{
  position: relative;
}

.task .messege{
  color: rgb(60, 60, 60);
  position: absolute;
  font-size: 30px;
  width: 100%;
  text-align: center;
  border-radius: 15px;
  padding-top: 63px;
  background-color: rgba(203, 203, 203, 0.3);
  box-shadow: 0 0 40px rgba(203, 203, 203, 0.6);
  height: 195px;
  z-index: 1;
  top: 0;
}
</style>
