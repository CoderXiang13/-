<template>
  <div id="app">
    <navControl/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import navControl from './components/common/navControl'
export default {
  name: 'App',
  components: {
    navControl
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app{
  width: 100vw;
  height: 100vh;
}
.container{
  height:100vh;
  overflow: auto;
}
</style>
