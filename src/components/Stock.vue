<template>
  <div id='stock-area' class="config_page">
    <div v-for="(sneaker,i) in GetStock"  :key="i">
      <img :src='sneaker.models[0].imageURL' id='stock-img' @click='showStock(i,$event)'>
      <div class='stock-div'>
        <p>{{sneaker.models[0].url}}</p>
        <p>{{sneaker.models[0].id}}</p>
        <p class="stock" v-for="(size,q) in sneaker.models[0].sizes"  :key="q">{{
          Object.keys(size)+' - '+
          sneaker.models[0].stock[q][size[Object.keys(size)]]
        }}</p>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  computed:{
    GetStock(){
      return this.$store.getters.GetStock
    }
  },
  methods: {
    ...mapActions(['GetProductId']),
    showStock(num){
      let stock_div = document.getElementsByClassName('stock-div')
      for(let i=0;i<stock_div.length;i++){
        stock_div[i].style.display = 'none'
      }
      stock_div[num].style.display = 'flex'
    }
  },
  beforeMount() {
    this.GetProductId()
  }
}
</script>

<style scoped>
#stock-area{
  list-style-type: none;
  background: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 20px;
  overflow: auto;
  width: 100%;
}
#stock-area div div {
  position: fixed;
  left: 60%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: none;
  background-color: #fff;
  border-radius: 30px;
  overflow: auto;
  width: 50%;
  margin-top: 1.5%;
  box-shadow: 0 0 10px rgba(135, 135, 138);
}

#stock-area p{
  text-align: center;
  width: 30%;
  margin: 7px 0px;
}
#stock-area p:first-child{
  width: 100%;
  word-break: break-all;
}
#stock-area p:nth-child(2){
  width: 100%;
  word-break: break-all;
}
#stock-area div:last-child{
  margin-bottom: 20px;
}
#stock-area img{
  border-radius: 30px;
  width: 100%;
  cursor: pointer;
}
.stock-div{
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
}
</style>
