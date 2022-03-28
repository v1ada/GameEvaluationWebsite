<template>
  <div class="CreateArticle-container">
    <h1>新建文章</h1>
    <!-- 表单组件 -->
    <el-form
      ref="article"
      :model="article"
      :rules="rules"
      label-width="80px"
      @submit.native.prevent="saveArticle('article')"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title" />
      </el-form-item>

      <el-form-item label="文章封面" prop="cover">
        <el-upload
          class="cover-uploader"
          ref="cover_uploader"
          :action="$http.defaults.baseURL + '/upload/article_cover'"
          :show-file-list="false"
          :on-change="handleChange"
          :on-success="afterCoverUpload"
          :auto-upload="false"
        >
          <img v-if="tempImgUrl" :src="tempImgUrl" class="cover" />
          <i v-else class="el-icon-plus cover-uploader-icon"></i>
        </el-upload>
        <el-button style="margin-left: 10px" size="small" type="success" @click="coverUpload">
          确认上传
        </el-button>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <el-input type="textarea" v-model="article.content" :rows="10" />
      </el-form-item>

      <el-form-item label="文章图片" prop="picture">
        <el-upload
          class="picture-uploader"
          ref="picture_uploader"
          :action="$http.defaults.baseURL + '/upload/article_picture'"
          list-type="picture"
          :auto-upload="false"
          :multiple="true"
          :on-success="afterPicUpload"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px" size="small" type="success" @click="pictureUpload">
            确认上传
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push('/articles/list')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CreateArticle',
  data() {
    return {
      // 封面上传临时预览图
      tempImgUrl: '',
      // 文章信息对象
      article: {
        title: '',
        cover: '',
        content: '',
        pictureList: [],
      },
      // 校验规则
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        cover: [{ required: true, message: '请上传文章封面', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
      },
    };
  },
  methods: {
    // 封面只显示预览
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift(); // 这一步，是 展示最后一次选择的文件
      }
      this.tempImgUrl = URL.createObjectURL(file.raw);
    },
    // 封面上传
    coverUpload() {
      this.$refs.cover_uploader.submit();
    },
    // 图片上传
    pictureUpload() {
      this.$refs.picture_uploader.submit();
    },
    // 封面上传完成后
    afterCoverUpload(res) {
      this.article.cover = res.url;
      this.$message({
        message: '上传成功',
        type: 'success',
      });
    },
    // 图片上传完成后
    afterPicUpload(res) {
      console.log(res);
      this.article.pictureList.push({
        url: res.url,
      });
      console.log(this.article.pictureList);
    },
    // 提交表单
    saveArticle(formName) {
      // 表单校验，返回valid是否通过校验
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$http.post('/rest/articles/add', this.article);
            this.$message({
              message: '保存文章成功',
              type: 'success',
            });
            this.$router.push('/articles/list');
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
/deep/.el-input__inner,
/deep/.el-textarea__inner {
  width: 700px;
}
.cover-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .el-upload:hover {
    border-color: #409eff;
  }
  .cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 288px;
    height: 162px;
    line-height: 162px;
    text-align: center;
  }
  .cover {
    width: 288px;
    height: 162px;
    display: block;
  }
}
.picture-uploader {
  /deep/ .el-upload-list--picture {
    width: 700px;
  }
  /deep/.el-upload-list--picture {
    .el-upload-list__item-thumbnail,
    .el-upload-list__item {
      width: 60%;
      height: 100%;
    }
  }
}
</style>
