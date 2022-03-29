<template>
  <div class="ListAdmin-container">
    <div class="ListHeader">
      <h2>用户列表</h2>
      <el-input class="searchInput" v-model="search" placeholder="输入用户名搜索" />
    </div>
    <el-table :data="usersData">
      <el-table-column prop="_id" label="ID" width="300" />
      <el-table-column prop="username" label="用户名" width="200" />
      <el-table-column prop="nickname" label="昵称" width="300" />
      <el-table-column prop="type" label="权限" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type">
            <el-option label="普通用户" :value="0" />
            <el-option label="管理员" :value="1" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="isBan" label="封禁状态" width="100" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isBan" active-color="#ff4949" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="updateUser(scope.row._id)" type="primary" size="small">保存</el-button>
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
      usersData: [],
      usersDataTotal: 0,
      search: '',
    };
  },
  computed: {
    userType() {
      if (this.usersData.type) return '管理员';
      else return '普通用户';
    },
  },
  methods: {
    async getUsersData() {
      try {
        const { data } = await this.$http.get('/rest/users');
        console.log(data);
        this.usersData = data.result;
        this.usersDataTotal = data.total;
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser(id) {
      try {
        const userData = this.usersData.find((item) => (item.id = id));
        console.log(userData);
        await this.$http.put(`/rest/users/${id}`, userData);
        this.$message({
          message: '保存成功',
          type: 'success',
        });
      } catch (err) {
        console.log(err);
      }
      // this.getUsersData();
    },
  },
  created() {
    this.getUsersData();
  },
};
</script>

<style lang="less" scoped>
.ListAdmin-container {
  .ListHeader {
    .searchInput {
      width: 500px;
    }
  }
}
</style>
