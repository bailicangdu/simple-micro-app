<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="'基座应用vue@' + version" />
    <div @click="toggleMicroApp" class='toggle-btn'>展示/隐藏</div>
    <micro-app name='app' url='http://localhost:3001/' v-if='showapp'></micro-app>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import Vue from 'vue'

export default {
  name: 'page1',
  data () {
    return {
      version: Vue.version,
      showapp: true,
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    toggleMicroApp () {
      this.showapp = !this.showapp
    }
  }
}
</script>

<style>
  micro-app[name=app] {
    display: block;
    border: 1px solid #000;
    margin: 10px 40px;
    padding: 30px 0;
    background-color: #ccc;
  }

  .toggle-btn {
    height: 40px;
    width: 100px;
    border: 1px solid #ddd;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    user-select: none;
  }
</style>
