<template>
  <header class="header-con">
    <img class="head-logo" src="../assets/logo.png" alt="">
    <div class="head-tip">基座引用vue2公共头部</div>
  </header>
</template>

<script>
export default {
  name: 'PublicHead',
  props: {
    version: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-con {
    display: flex;
    align-items: center;
    height: 60px;
    background: #f1f1f1;
    padding: 10px 30px;
    justify-content: center;
  }

  .head-logo {
    width: 60px;
  }

  .head-tip {
    font-size: 20px;
    color: #000;
    margin-left: 20px;
  }
</style>
