<template>
  <div>
    <PublicHead />
    <micro-app name='app' url='http://localhost:3001/'></micro-app>
  </div>
</template>

<script>
import PublicHead from '../components/PublicHead.vue'
import Vue from 'vue'

export default {
  name: 'page1',
  data () {
    return {
      version: Vue.version,
    }
  },
  components: {
    PublicHead
  },
}
</script>

<style>
  .logo-img {
    background: url(../assets/logo.png) no-repeat;
    height: 200px;
    width: 200px;
    margin: 0 auto;
  }
</style>
