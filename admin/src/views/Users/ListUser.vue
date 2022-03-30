<template>
  <div class="ListUser-container">
    <div class="ListHeader">
      <h2>用户列表</h2>
      <!-- 搜索框 -->
      <el-input
        class="searchInput"
        v-model="searchStr"
        @input="searchUser"
        placeholder="搜索用户名或昵称"
      />
    </div>
    <el-table :data="usersData">
      <el-table-column prop="_id" label="ID" width="300" />
      <el-table-column prop="username" label="用户名" width="250" />
      <el-table-column prop="nickname" label="昵称" width="250" />
      <el-table-column prop="type" label="权限" width="150">
        <!-- 下拉菜单改变权限 -->
        <template slot-scope="scope">
          <el-select v-model="scope.row.type">
            <el-option label="普通用户" :value="0" />
            <el-option label="管理员" :value="1" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="isBan" label="封禁状态" width="100" align="center">
        <!-- 更改封禁状态 -->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isBan" active-color="#ff4949" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="updateUser(scope.row)" type="primary" size="small">保存</el-button>
          <el-button @click="removeUser(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ListUser',
  data() {
    return {
      usersData: [],
      usersDataTotal: 0,
      searchStr: '',
    };
  },
  methods: {
    // 获取全部用户信息
    async getUsersData() {
      try {
        const { data } = await this.$http.get('/rest/users');
        this.usersData = data.result;
        this.usersDataTotal = data.total;
      } catch (err) {
        console.log(err);
      }
    },
    // 模糊搜索用户
    async searchUser() {
      const { data } = await this.$http.get(`/rest/users/search?search=${this.searchStr}`);
      this.usersData = data;
    },
    // 更新用户权限与状态
    async updateUser(row) {
      try {
        const userData = this.usersData.find((item) => item._id === row._id);
        console.log(userData);
        await this.$http.put(`/rest/users/${userData._id}`, userData);
        this.$message({
          message: '保存成功',
          type: 'success',
        });
      } catch (err) {
        console.log(err);
        this.$message({
          message: '保存失败',
          type: 'error',
        });
        this.$router.go(0);
      }
    },
    async removeUser(row) {
      this.$confirm(`是否删除用户“${row.username}”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          await this.$http.delete(`/rest/users/delete/${row._id}`);
          this.$message({
            message: '删除用户成功',
            type: 'success',
          });
        } catch (err) {
          console.log(err);
          this.$message({
            message: '删除用户失败',
            type: 'error',
          });
        }
        // 重新获取数据
        this.$router.go(0);
      });
    },
  },
  created() {
    this.getUsersData();
  },
};
</script>

<style lang="less" scoped>
.ListUser-container {
  .ListHeader {
    .searchInput {
      width: 500px;
    }
  }
}
</style>
