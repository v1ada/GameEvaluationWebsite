<template>
  <div id="app">
    <el-container direction="vertical">
      <div class="bg-img">
        <img src="./assets/img/background//banner_1.png" alt="" />
      </div>
      <el-header>
        <el-menu
          mode="horizontal"
          background-color="#222"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path"
          :router="true"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/news">新闻资讯</el-menu-item>
          <el-menu-item index="/game/library">游戏库</el-menu-item>
          <el-menu-item index="/login" v-if="!loginState" class="login-item">登录</el-menu-item>
          <el-submenu index="#" v-if="loginState" class="login-item">
            <template slot="title" class="login-item-title">
              <!-- 显示头像和用户名 -->
              <img class="profile-photo" :src="userData.profile_photo" alt="" />
              {{ userData.username }}
            </template>
            <el-menu-item :index="`/userData/${userData._id}`">个人资料</el-menu-item>
            <el-menu-item :index="`/updatePassword/${userData._id}`">修改密码</el-menu-item>
            <el-menu-item index="#" @click="logout">注销</el-menu-item>
            <!-- 管理后台入口 -->
            <el-menu-item index="#" v-if="userData.type">
              <a href="./admin" class="admin-link">管理后台</a>
            </el-menu-item>
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
          const { data } = await this.$http.get(`/checkLogin`);
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

<style lang="scss" scoped>
.bg-img {
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  display: flex;
  justify-content: center;
  img {
    z-index: 0;
    min-width: 1920px;
    width: 100%;
    min-height: 100vh;
  }
}
.el-header {
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: #222;
  .el-menu {
    width: 1100px;
    margin: 0 auto;
    .login-item {
      float: right;
      .profile-photo {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
  }
}
.el-main {
  width: 1200px;
  margin: 60px auto;
}
.admin-link {
  text-decoration: none;
  color: #fff;
}
</style>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
</style>
