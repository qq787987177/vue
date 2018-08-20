<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <header-div :todo="items" special="title" @changeTitle="ttt"></header-div>
    <!--<router-view/>-->
  </div>
</template>

<script>

import HeaderDiv from './components/HeaderDiv'

export default {
  data () {
    return {
      title: '',
      items: [
        { id: 0, text: '蔬菜' },
        { id: 1, text: '奶酪' },
        { id: 2, text: '随便其它什么人吃的东西' }
      ]
    }
  },
  components: { HeaderDiv },
  name: 'App',
  methods: {
    ttt: function (msg) {
      this.title = msg
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
