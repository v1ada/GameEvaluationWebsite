<template>
  <div class="ListAdmin-container">
    管理员列表
    <el-table :data="admin_usersData">
      <el-table-column prop="_id" label="ID" width="300" />
      <el-table-column prop="username" label="用户名" width="200" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            type="primary"
            size="small"
          >
            编辑
          </el-button>
          <el-button @click="removeAdminUser(scope.row._id)" type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ListAdmin',
  data() {
    return {
      admin_usersData: [],
    };
  },
  methods: {
    async getAdminUsersData() {
      try {
        const result = await this.$http.get('/rest/admin_users');
        this.admin_usersData = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    async removeAdminUser(id) {
      try {
        await this.$http.delete(`/rest/admin_users/delete/${id}`);
      } catch (err) {
        console.log(err);
      }
      this.$message({
        message: '删除文章成功',
        type: 'success',
      });
      this.getAdminUsersData();
    },
  },
  created() {
    this.getAdminUsersData();
  },
};
</script>

<style lang="less" scoped></style>
