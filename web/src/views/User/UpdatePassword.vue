<template>
  <div class="updatePassword-container">
    <el-card class="updatePassword-card">
      <div slot="header" class="header">
        <span>修改密码</span>
      </div>
      <el-form
        ref="passwordForm"
        :model="userData"
        :rules="rules"
        @submit.native.prevent="updatePassword('passwordForm')"
      >
        <el-form-item label="新密码" prop="password">
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
          <el-button @click="this.$router.push('/')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UpdatePassword',
  data() {
    return {
      userData: {
        password: '',
        checkPass: '',
      },
      rules: {
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
    // 提交修改
    updatePassword(formName) {
      // 表单验证
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送修改请求
          try {
            await this.$http.put(`/rest/users/${this.$route.params.id}`, this.userData);
            this.$alert('修改密码成功', {
              type: 'success',
              showClose: false,
            }).then(() => {
              // 清空 token
              localStorage.clear();
              // 刷新重新登录
              this.$router.push('/login');
              this.$router.go(0);
            });
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

<style lang="scss" scoped>
.updatePassword-card {
  width: 25rem;
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
