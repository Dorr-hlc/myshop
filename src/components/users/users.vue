<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search" @click="searcUser()"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
      <el-col></el-col>
      <el-col></el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column label="#" width="180" type="index"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建时间">
        <!-- 在单元格中展示非文本数据使用过滤器的时候需要这样 使用，row表示userlist数组中的每一项，需要使用slot-scoped传值 -->
        <template slot-scope="userlist">{{
          userlist.row.create_time | formdata
        }}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <!-- scope绑定当前mg_state -->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
        <el-pagination
        class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      // 用户数据
      userlist: [],
      total: -1,
    };
  },
  created() {
    this.getUserinfo();
  },
  methods: {
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        // 重新获取数据
        this.pagesize=val;
          this.pagenum=1
        this.getUserinfo();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        // 改变当前页码，然后重新调用函数
        this.pagenum=val
        this.getUserinfo()
      },

    async getUserinfo() {
      const AUTH_TOKEN = localStorage.getItem("token");
      console.log(AUTH_TOKEN);
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;

      if (status === 200) {
        // 给表格数据赋值
        this.userlist = users;
        // 给total赋值
        this.total = total;
        // 提示
        this.$message(msg);
      } else {
        this.$message(msg);
      }
    },
    // 搜索用户
     searcUser(){
      this.getUserinfo()
    }
  },
};
</script>
<style scoped>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
.page{
 margin-top: 50px;

}
</style>
