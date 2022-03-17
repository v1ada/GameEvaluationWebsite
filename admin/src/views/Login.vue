<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header" class="header">
        <span>登录</span>
      </div>
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="userData.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userData.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // login(formName) {
    //   this.$refs[formName].validate(async (valid) => {});
    // },
    async login() {
      const result = await this.$http.post('login', this.userData);
      console.log(result.data);
      localStorage.token = result.data;
      this.$router.push('/');
      this.$message({
        type: 'success',
        message: '登录成功',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-card {
  width: 25rem;
  margin: 6rem auto;
}
</style>
