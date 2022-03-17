<template>
  <div class="ListArticle-container">
    ListArticle
    <el-table :data="articlesData">
      <!-- <el-table-column type="index" index="1" label="序号" /> -->
      <el-table-column prop="_id" label="ID" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="cover" label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.cover" style="height: 3em" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
            type="primary"
            size="small"
          >
            编辑
          </el-button>
          <el-button @click="removeArticle(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ListArticle',
  data() {
    return {
      articlesData: [],
    };
  },
  methods: {
    // 获取所有文章数据
    async getArticlesData() {
      try {
        const result = await this.$http.get('/rest/articles');
        this.articlesData = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 删除文章
    removeArticle(row) {
      this.$confirm(`是否删除文章“${row.title}”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          await this.$http.delete(`/rest/articles/delete/${row._id}`);
        } catch (err) {
          console.log(err);
        }
        this.$message({
          message: '删除文章成功',
          type: 'success',
        });
        // 重新获取文章数据
        this.getArticlesData();
      });
    },
  },
  created() {
    this.getArticlesData();
  },
};
</script>

<style lang="less" scoped></style>
