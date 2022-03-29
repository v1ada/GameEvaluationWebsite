<template>
  <div class="CreateArticle-container">
    <h1>新建管理员</h1>
    <el-form
      ref="admin_user"
      :model="admin_user"
      :rules="rules"
      label-width="80px"
      @submit.native.prevent="saveAdminUser('admin_user')"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="admin_user.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="admin_user.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push('/admin_users/list')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CreateAdminUser',
  data() {
    return {
      admin_user: {
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
    saveAdminUser(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$http.post('/rest/admin_users', this.admin_user);
          } catch (err) {
            console.log(err);
          }
          this.$message({
            message: '保存成功',
            type: 'success',
          });
          this.$router.push('/admin_users/list');
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
/deep/.el-input__inner,
/deep/.el-textarea__inner {
  width: 700px;
}
</style>
