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
          <el-menu-item index="/login" v-if="!this.loginState" class="login-item">
            登录
          </el-menu-item>
          <el-submenu index="#" v-if="this.loginState" class="login-item">
            <template slot="title" class="login-item-title">
              <!-- 显示头像和用户名 -->
              <img class="profile-photo" :src="userData.profile_photo" alt="" />
              {{ this.userData.username }}
            </template>
            <el-menu-item :index="`/userData/${this.userData._id}`">个人资料</el-menu-item>
            <el-menu-item :index="`/updatePassword/${this.userData._id}`">修改密码</el-menu-item>
            <el-menu-item index="#" @click="logout">注销</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    ...mapState(['loginState', 'userData']),
  },
  methods: {
    // 检查是否已经登录
    async checkLogin() {
      if (localStorage.token) {
        try {
          // 验证登录信息，返回登录的用户信息
          const { data } = await this.$http.get(`/rest/users/checkLogin`);
          const userData = data;
          // 将已经登录的用户信息，提交到state上
          this.$store.commit('changeUserData', userData);
        } catch (err) {
          console.log(err);
        }
      }
    },
    // 注销登出
    logout() {
      localStorage.clear();
      this.$router.go(0);
    },
  },
  created() {
    this.checkLogin();
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
      .login-item {
        float: right;
        /deep/ .el-submenu__title {
          font-size: 16px;
          .profile-photo {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
      }
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
