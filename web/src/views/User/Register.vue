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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="userData.checkPass"
            show-password
            placeholder="请再次输入密码"
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
  name: 'Register',
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
    async registerUser(formName) {
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

<style lang="scss" scoped>
@import '@/assets/scss/user_form.scss';
</style>
