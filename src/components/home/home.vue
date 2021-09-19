<template>
  <el-container class="container">
    <el-header class="header"
      ><el-row>
        <el-col :span="2"
          ><div class="grid-content bg-purple">
      </div
        ></el-col>
        <el-col :span="2">
               <div class="asidebtn">
        <i
          class="el-icon-s-unfold"
          @click="toggleCollapse"
          v-if="isCollapse"
        ></i>
        <i class="el-icon-s-fold" @click="toggleCollapse" v-else></i>
      </div>
        </el-col>
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            <h2 class="middle">后台管理系统</h2>
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a href="#" class="loginout" @click.prevent="loginout">退出</a>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="auto">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          unique-opened
          :router="true"
          :collapse-transition="true"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <!-- <template slot="title">分组一</template> -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
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
            </el-menu-item>
            <el-menu-item index="2-2">
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
      <el-main class="main">
      <transition name="fade" mode="out-in">
    <router-view />
</transition>
       
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    loginout() {
      localStorage.setItem("token", "");
      this.$message.success("退出成功");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.container {
  height: 100%;
}
.header {
/* background-color: #b3c0d1; */
background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, 
#e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25,
 #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);
}
.aside {
background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
height: 100%; 
}
.main {
  /* background-color: #e9eef3; */
  background: url('~@/assets/image/bg.jpg') no-repeat;
  background-size: 100% 100%;;
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
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.asidebtn{
  margin-left: 100px;
}
/*页面切换动画*/
/*进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除*/
.fade-enter-active {
    transition: opacity .5s;
}
/*进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除*/
.fade-enter {
    opacity: 0;
}
/*离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除*/
.fade-leave {
    opacity: 1;
}
/*离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除*/
.fade-leave-active {
    opacity:0;
    transition: opacity .5s;
}
</style>

