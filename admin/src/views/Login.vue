<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header" class="header">
        <span>登录</span>
      </div>
      <el-form
        ref="loginUser"
        :model="userData"
        :rules="rules"
        @submit.native.prevent="login('loginUser')"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="userData.password"
            show-password
            placeholder="请输入密码"
          />
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
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    async login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const result = await this.$http.post('/adminLogin', this.userData);
            localStorage.token = result.data;
            this.$message({
              message: '登录成功',
              type: 'success',
            });
            this.$router.push('/');
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-card {
  width: 25rem;
  margin: 6rem auto;
  .header {
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
  /deep/ .el-form-item {
    .el-form-item__label {
      font-size: 16px;
    }
    .el-button--primary {
      width: 100%;
      font-size: 16px;
    }
  }
}
</style>
