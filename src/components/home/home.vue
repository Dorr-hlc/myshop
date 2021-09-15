<template>
  <el-container class="container">
    <el-header class="header"
      ><el-row>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <img src="@/assets/image/logo.jpeg" alt="logo" class="logo" /></div
        ></el-col>
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            <h2 class="middle">后台管理系统</h2>
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a href="#" class="loginout">退出</a>
          </div></el-col
        >
      </el-row></el-header
    >
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          unique-opened
        >
          <el-submenu index="1">
            <!-- <template slot="title">分组一</template> -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
                <i class="el-icon-table-lamp"></i>
                <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
                   <el-submenu index="2">
            <!-- <template slot="title">分组一</template> -->
            <template slot="title">
              <i class="el-icon-c-scale-to-original"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
                <i class="el-icon-user"></i>
                <span>角色列表</span>
            </el-menu-item>   <el-menu-item index="2-2">
                <i class="el-icon-coordinate"></i>
                <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
                   <el-submenu index="3">
            <!-- <template slot="title">分组一</template> -->
            <template slot="title">
              <i class="el-icon-shopping-bag-1"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
                <i class="el-icon-attract"></i>
                <span>商品列表</span>
            </el-menu-item>
                   <el-menu-item index="3-2">
                <i class="el-icon-user"></i>
                <span>分类参数</span>
            </el-menu-item>
                   <el-menu-item index="3-3">
                <i class="el-icon-umbrella"></i>
                <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
                   <el-submenu index="4">
            <!-- <template slot="title">分组一</template> -->
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
                <i class="el-icon-s-fold"></i>
                <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
                   <el-submenu index="5">
            <!-- <template slot="title">分组一</template> -->
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
                <i class="el-icon-ship"></i>
                <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}
/* 头部样式 */
.logo {
  width: 200px;
  height: 50px;
}
.middle {
  line-height: 25px;
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>

