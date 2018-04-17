<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view/>
    <notify></notify>
  </div>
</template>

<script>
  import notify from './components/common/notify'
  import toolbar from './components/toolbar'

  export default {
    name: 'app',
    components: { notify, toolbar }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: whitesmoke;
  }

  .flex {
    flex: 1;
  }

</style>
