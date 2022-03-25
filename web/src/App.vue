<template>
  <div id="app">
    <el-container direction="vertical">
      <div class="bg-img">
        <img src="./assets/img/background//banner_1.png" alt="" />
      </div>
      <el-header>
        <el-menu
          mode="horizontal"
          background-color="#151617"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path"
          :router="true"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/news">新闻资讯</el-menu-item>
          <el-menu-item index="/game/library">游戏库</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
#app {
  margin: 0;
  .bg-img {
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background: #282829;
    display: flex;
    justify-content: center;
    img {
      min-width: 2000px;
      min-height: 100vh;
      width: 1920px;
      height: 100%;
      z-index: 0;
    }
  }
  .el-header {
    position: fixed;
    width: 100%;
    margin: 0;
    padding: 0;
    z-index: 100;
    background-color: #151617;
    .el-menu {
      width: 1100px;
      margin: 0 auto;
    }
  }
  .el-main {
    width: 1200px;
    margin: 60px auto;
  }
}
</style>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
