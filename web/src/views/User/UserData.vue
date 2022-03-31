<template>
  <div class="userData-container">
    <el-card class="userData-card">
      <div slot="header" class="header">
        <span>个人资料</span>
      </div>
      <el-descriptions title="基本信息">
        <el-descriptions-item label="用户名">{{ userData.username }}</el-descriptions-item>
        <el-descriptions-item label="账号类型">{{ userType }}</el-descriptions-item>
        <el-descriptions-item label="账号状态">{{ banState }}</el-descriptions-item>
      </el-descriptions>
      <p style="font-weight: 900">修改个人信息</p>
      <el-form
        ref="userData"
        :model="userData"
        :rules="rules"
        @submit.native.prevent="editUserData('userData')"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userData.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="头像" prop="profile-photo" class="profile-item">
          <el-upload
            class="profile-uploader"
            ref="cover_uploader"
            :action="$http.defaults.baseURL + '/upload/profile_photo'"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-change="profileHandleChange"
            :on-success="afterUpload"
            :auto-upload="false"
          >
            <img v-if="tempImgUrl" :src="tempImgUrl" class="profile-photo" />
            <i v-else class="el-icon-plus profile-uploader-icon"></i>
          </el-upload>
          <el-button size="small" type="primary" @click="profileUpload">确认上传</el-button>
        </el-form-item>
        <el-form-item class="button-item">
          <el-button type="primary" native-type="submit">保存</el-button>
          <el-button @click="$router.push('/')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserData',
  data() {
    return {
      tempImgUrl: '',
      userData: {
        username: '',
        nickname: '',
        profile_photo: '',
        type: '',
        isBan: Boolean,
      },
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
      },
    };
  },
  computed: {
    userType() {
      return this.userData.type ? '管理员' : '普通用户';
    },
    banState() {
      return this.userData.isBan ? '禁止发言' : '正常';
    },
  },
  methods: {
    // 获取用户信息
    async getUserData() {
      try {
        const result = await this.$http.get(`/rest/users/${this.$route.params.id}`);
        this.userData = result.data;
        // 初始头像
        this.tempImgUrl = this.userData.profile_photo;
      } catch (err) {
        console.log(err);
      }
    },
    // 设置请求头
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`,
      };
    },
    // 头像选择变化时
    profileHandleChange(file, fileList) {
      // 控制头像只能上传一张
      if (fileList.length > 1) {
        fileList.shift(); // 这一步，是 展示最后一次选择的文件
      }
      // 选择时，显示临时头像图
      this.tempImgUrl = URL.createObjectURL(file.raw);
    },
    // 头像提交上传
    profileUpload() {
      this.$refs.cover_uploader.submit();
      this.$message({
        message: '上传成功',
        type: 'success',
      });
    },
    // 头像上传完成后
    afterUpload(res) {
      this.userData.profile_photo = res.url;
    },
    validateCheckPass(rule, value, cb) {
      if (!value) cb(new Error('请再次输入密码'));
      else if (value !== this.userData.password) cb(new Error('两次输入的密码不一致'));
      else cb();
    },
    // 提交修改
    editUserData(formName) {
      // 表单验证
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送修改请求
          try {
            await this.$http.put(`/rest/users/${this.$route.params.id}`, this.userData);
            this.$message({
              message: '保存文章成功',
              type: 'success',
            });
            // 跳转到首页
            this.$router.go(0);
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
  created() {
    this.getUserData();
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
  .profile-item {
    display: flex;
    /deep/ .el-form-item__content {
      display: flex;
      flex-direction: column;
    }
    .profile-uploader {
      /deep/ .el-upload {
        border: 1px dashed #b4bccc;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      /deep/ .el-upload:hover {
        border-color: #409eff;
      }
      .profile-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 188px;
        height: 188px;
        line-height: 188px;
        text-align: center;
      }
      .profile-photo {
        width: 188px;
        height: 188px;
        display: block;
      }
    }
    /deep/ button {
      margin: 0 auto;
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
