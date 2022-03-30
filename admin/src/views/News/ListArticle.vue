<template>
  <div class="ListArticle-container">
    <el-table :data="articlesData">
      <el-table-column type="index" :index="index" label="序号" />
      <el-table-column prop="_id" label="ID" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="cover" label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.cover" style="height: 3em" />
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间" />
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
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        layout="prev, pager, next, jumper, ->, total"
        :total="articlesTotal"
        background
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListArticle',
  data() {
    return {
      articlesData: [],
      articlesTotal: 0,
      articlesListPage: 1,
    };
  },
  computed: {
    index() {
      return (this.articlesListPage - 1) * 10 + 1;
    },
  },
  methods: {
    // 获取所有文章数据
    async getArticlesData() {
      try {
        const { data } = await this.$http.get(
          `/rest/articles?page=${this.articlesListPage}&sort=pubTimeDesc`
        );
        this.articlesData = data.result;
        this.articlesTotal = data.total;
      } catch (err) {
        console.log(err);
      }
    },
    // 分页变化事件
    currentChange(currentPage) {
      this.articlesListPage = currentPage;
      // 获取分页数据
      this.getArticlesData({ page: this.articlesListPage });
      // 网页偏移到顶部
      document.documentElement.scrollTop = 0;
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
          this.$message({
            message: '删除文章成功',
            type: 'success',
          });
        } catch (err) {
          console.log(err);
          this.$message({
            message: '删除文章失败',
            type: 'error',
          });
        }
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
