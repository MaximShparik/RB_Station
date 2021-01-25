<template>
  <div id="app">
    <Header v-if='GetLogin==true&&GetCurrentMode!=="Configs"'/>
    <Login v-if='GetLogin==false'/>
    <Nike v-if='GetLogin==true&&GetCurrentMode=="Nike"' v-bind:class='GetCurrentMode'/>
    <Adidas v-if='GetLogin==true&&GetCurrentMode=="Adidas"' v-bind:class='GetCurrentMode'/>
    <Brandshop v-if='GetLogin==true&&GetCurrentMode=="Brandshop"' v-bind:class='GetCurrentMode'/>
    <Mails v-if='GetLogin==true&&GetCurrentMode=="Mails"' v-bind:class='GetCurrentMode'/>
    <Configs v-if='GetLogin==true&&GetCurrentMode=="Configs"' v-bind:class='GetCurrentMode'/>
    <Mode v-if='GetLogin==true'/>
  </div>
</template>

<script>
import Nike from './views/Nike.vue'
import Adidas from './views/Adidas.vue'
import Brandshop from './views/Brandshop.vue'
import Mails from './views/Mails.vue'
import Login from './views/Login.vue'
import Mode from './components/Mode.vue'
import Header from './components/Header.vue'
import Configs from './views/Configs.vue'

export default {
  computed:{
    GetCurrentMode(){
      return this.$store.getters.GetConfigs.UserData.currentMode
    },
    GetLogin(){
      return this.$store.getters.GetConfigs.UserData.isLoged
    }
  },
  components: {
    Nike,
    Adidas,
    Brandshop,
    Mails,
    Login,
    Mode,
    Header,
    Configs
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
  ::-webkit-scrollbar{
    width: 0px;
  }
  body{
    display: flex;
    flex-direction: column;
    padding: 0px;
    height: max-content;
    min-height: calc(100vh - 70px);
    margin: 0px;
    background-image: linear-gradient(to top, #adb4ba 0%, rgba(224, 234, 244, 0.3) 100%);
    margin-bottom: 70px;
  }
  *{
    box-sizing: border-box;
    font-family: 'Comfortaa', cursive;
  }
  ul{
    margin: 30px 30px 0px;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 25px;
  }
  input:focus, textarea:focus, select:focus{
        outline: none;
    }
  @media (max-width:1400px) {
    ul{
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width:1300px) {
    ul.minimize{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width:1100px) {
    ul.minimize{
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width:900px) {
    ul{
      grid-template-columns: 1fr;
    }
  }

</style>
