<template>
  <div class="userData-container">
    <el-card class="userData-card">
      <div slot="header" class="header">
        <span>个人资料</span>
      </div>
      <el-form
        ref="changePassword"
        :model="userData"
        :rules="rules"
        @submit.native.prevent="editUserData('changePassword')"
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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="userData.checkPass"
            show-password
            placeholder="请再次输入密码"
          />
        </el-form-item>
        <el-form-item class="button-item">
          <el-button type="primary" native-type="submit">确认</el-button>
          <el-button @click="this.$router.push('/userData')">返回</el-button>
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
        checkPass: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkPass: [{ validator: this.validateCheckPass, trigger: 'blur' }],
      },
    };
  },
  methods: {
    validateCheckPass(rule, value, cb) {
      if (!value) cb(new Error('请再次输入密码'));
      else if (value !== this.userData.password) cb(new Error('两次输入的密码不一致'));
      else cb();
    },
    async editUserData(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$http.post('/rest/users/add', this.userData);
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
.userData-card {
  width: 50rem;
  margin: 0 auto;
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
  .button-item {
    display: flex;
    justify-content: center;
    // el-button 样式
    .el-button {
      width: 100px;
      margin: 0 20px;

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
  }
}
</style>
