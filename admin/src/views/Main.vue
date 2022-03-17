<template>
  <div class="main-container">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1']" :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              内容管理
            </template>
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              用户管理
            </template>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>Ming</span>
        </el-header>

        <el-main style="padding: 20px 100px">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
