<template>
  <div class="CreateArticle-container">
    <h1>编辑文章</h1>
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
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-change="coveHandleChange"
          :on-success="afterUpload"
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
        <el-input type="textarea" v-model="article.content" rows="10" />
      </el-form-item>

      <el-form-item label="文章图片" prop="picture">
        <el-upload
          class="picture-uploader"
          ref="picture_uploader"
          :action="$http.defaults.baseURL + '/upload/article_picture'"
          :headers="getAuthHeaders()"
          list-type="picture"
          :file-list="article.fileList"
          :auto-upload="false"
          :multiple="true"
          :before-upload="beforePicUpload"
          :before-remove="beforePicDel"
          :on-success="afterPicUpload"
          :on-remove="pictureDel"
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
  props: {
    id: {},
  },
  data() {
    return {
      tempImgUrl: '',
      article: {
        title: '',
        cover: '',
        content: '',
        pictureList: [],
        fileList: [],
        formData: '',
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        cover: [{ required: true, message: '请上传文章封面', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
      },
    };
  },
  methods: {
    // 封面选择变化时
    coveHandleChange(file, fileList) {
      // 控制封面只能上传一张
      if (fileList.length > 1) {
        fileList.shift(); // 这一步，是 展示最后一次选择的文件
      }
      // 选择时，显示临时封面图
      this.tempImgUrl = URL.createObjectURL(file.raw);
    },
    // 封面提交上传
    coverUpload() {
      this.$refs.cover_uploader.submit();
      this.$message({
        message: '上传成功',
        type: 'success',
      });
    },
    // 封面上传完成后
    afterUpload(res) {
      this.article.cover = res.url;
    },
    // 图片提交上传
    pictureUpload() {
      this.$refs.picture_uploader.submit();
    },
    // 图片上传完成后
    async afterPicUpload(res, file, fileList) {
      // 更新文件列表
      this.article.fileList = fileList;
      // 更新图片url数据
      this.article.pictureList.push({
        url: res.url,
      });
      // 更新到数据库
      try {
        await this.$http.put(`/rest/article/${this.$route.params.id}`, this.article);
      } catch (err) {
        console.log(err);
      }
      this.$message({
        message: '上传成功',
        type: 'success',
      });
    },
    // 删除图片
    async pictureDel(file, fileList) {
      // 删除完的 文件列表 更新到 到 pictureList fileList 中
      this.article.pictureList = fileList;
      this.article.fileList = fileList;
      // 需要删除的图片信息
      const picture = {
        articleId: this.article._id,
        fileId: file._id,
        fileUrl: file.url,
      };
      // 删除请求
      try {
        await this.$http.put(`/rest/article/picture/delete/`, picture);
      } catch (err) {
        console.log(err);
      }
    },
    // 获取文章信息
    async getArticleData() {
      try {
        const result = await this.$http.get(`/rest/articles/${this.$route.params.id}`);
        this.article = result.data;
        // 初始封面
        this.tempImgUrl = this.article.cover;
        // 深拷贝文件列表
        this.article.fileList = [...this.article.pictureList];
        // [...this.article.fileList] = this.article.pictureList;
      } catch (err) {
        console.log(err);
      }
    },
    // 保存文章信息
    saveArticle(formName) {
      // 表单验证
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送修改请求
          try {
            await this.$http.put(`/rest/article/${this.$route.params.id}`, this.article);
          } catch (err) {
            console.log(err);
          }
          this.$message({
            message: '保存文章成功',
            type: 'success',
          });
          // 跳转到首页
          this.$router.push('/articles/list');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  created() {
    this.getArticleData();
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
    border: 1px dashed #b4bccc;
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
