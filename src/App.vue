<template>
  <div id="app">
    <!-- <FileRecord></FileRecord> -->
    <router-view/>
  </div>
</template>

<script>
import FileRecord from "@/views/filesRecord"
export default {
  components: { FileRecord }, 
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
