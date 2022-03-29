<template>
  <div class="register-container">
    <el-card class="register-card">
      <div slot="header" class="header">
        <span>注册</span>
      </div>
      <el-form
        ref="registerUser"
        :model="userData"
        :rules="rules"
        @submit.native.prevent="registerUser('registerUser')"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userData.nickname" placeholder="请输入昵称" />
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
          <el-button type="primary" native-type="submit">注册</el-button>
        </el-form-item>
        <el-form-item class="login">
          <router-link to="/login">已经有账号，点击登录</router-link>
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
        nickname: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    async registerUser(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$http.post('/rest/user/add', this.userData);
            this.$message({
              message: '注册成功',
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
.register-card {
  width: 25rem;
  margin: 6rem auto;
  .header {
    span {
      font-size: 20px;
      color: #2a2424;
      font-weight: 600;
    }
  }
  /deep/ .el-form-item {
    .el-form-item__label {
      font-size: 16px;
    }
    // el-button 样式
    .el-button {
      background-color: #fff;
      border-color: #c6cbd7;
      &:hover {
        border-color: #333;
        color: #333;
      }
      &:focus {
        color: #606266;
      }
    }
    .el-button--primary,
    .el-button--primary:focus {
      width: 100%;
      font-size: 16px;
      color: #fff;
      background-color: #333;
      border-color: #333;
      &:hover {
        background: #505050;
        border-color: #505050;
        color: #fff;
      }
    }
    &.login {
      text-align: center;
      a {
        display: inline-block;
        text-decoration: none;
        color: #333;
        font-size: 16px;
      }
    }
  }
}
</style>
