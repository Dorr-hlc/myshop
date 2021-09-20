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
          <el-submenu :index="item.order+''" v-for="(item,index) in menus" :key="index">
            <!-- <template slot="title">分组一</template> -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item1.path+''" v-for="(item1,index1) in item.children" :key="index1">
              <i class="el-icon-table-lamp"></i>
              <span>{{item1.authName}}</span>
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
      menus:[]
    };
  },
  // beforeCreate() {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     this.$router.push("/login");
  //   }
  // },
  created(){
    this.getMenu()
  },
  methods: {
    // 获取导航数据
    async getMenu(){
      const res= await this.$http.get(`menus`)
      console.log(res);
      this.menus=res.data.data;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
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
  background-size: 100% 100%;
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

