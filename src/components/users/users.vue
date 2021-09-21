<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
     <myBread leavel1="用户管理" leavel2="用户列表"></myBread> 
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input @clear="loadUserlist" placeholder="请输入内容" v-model="query" class="inputSearch" clearable>
          <el-button slot="append" icon="el-icon-search" @click="searcUser()"></el-button>
        </el-input>
        <el-button type="success" @click="showDialog">添加用户</el-button>
      </el-col>
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
            @change="editStatus(scope.row.mg_state,scope.row.id)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="editUser(scope.row)"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle  @click="deleteUser(scope.row.id)"></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="giveRole(scope.row)"></el-button>

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
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogTableVisible" width="25%">
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="用户名">
    <el-input v-model="formLabelAlign.username" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formLabelAlign.password" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="formLabelAlign.email" size="mini"></el-input>
  </el-form-item>
    <el-form-item label="电话">
    <el-input v-model="formLabelAlign.mobile" size="mini"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm" size="mini">确认</el-button>
    <el-button @click="closeForm" size="mini">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
<!-- 编辑用户信息 -->
    <el-dialog title="编辑用户" :visible.sync="dialogTableVisibleEdit" width="25%">
<el-form :label-position="labelPosition" label-width="80px" :model="editForm">
  <el-form-item label="用户名">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
    <el-form-item label="电话">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
    <el-form-item> 
      <el-button type="primary" @click="editSure">确认</el-button>
    <el-button @click="closeEdit">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
<!-- 分配角色弹窗 -->
    <el-dialog title="分配角色" :visible.sync="dialogTableVisibleRole" width="25%">
      <el-form :label-position="labelPosition" label-width="80px">
    <el-form-item label="用户名">
      {{currentUserName}}
  </el-form-item>
      <el-form-item label="角色">
      <el-select v-model="rid" placeholder="请选择">
    <el-option
      v-for="item in roles"
      :key="item.value"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
      <el-form-item class="roleBtn">  
      <el-button type="primary" @click="editRole">确认</el-button>
    <el-button @click="closeRole">取消</el-button>
  </el-form-item>
  </el-form>
</el-dialog>
 
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 4,
      // 用户数据
      userlist: [],
      total: -1,
      dialogTableVisible:false,
      dialogTableVisibleEdit:false,
      dialogTableVisibleRole:false,
      labelPosition: 'right',
        formLabelAlign: {
          username: '',
          password: '',
          email: '',
          mobile:''
        },
        editForm:[],
        userid:0,
        currentUserName:'', 
        rid:0,
        // 保存所有的角色数据
        roles:[],
    };
  },
  created() {
    this.getUserinfo();
  },
  methods: {
//  分配用户角色
async giveRole(user){
  this.dialogTableVisibleRole=true
  this.currentUserName=user.username
  const res=await this.$http.get(`roles`)
  const res1=await this.$http.get(`users/${user.id}`)
  this.roles=res.data.data
  this.rid=res1.data.data.rid
  this.userid=user.id
},
// 确认角色
async editRole(){
  this.dialogTableVisibleRole=false
  const res = await this.$http.put(`users/${this.userid}/role`,{
    rid:this.rid
  })
    const {meta:{status,msg},data}=res.data
  if(status===200){
    this.$message.success(msg)
  }else{
    this.$message.warning(msg)
  }
},
// 取消
closeRole(){
    this.dialogTableVisibleRole=false
},
  // 删除用户信息
async deleteUser(id){
  const res= await this.$http.delete(`users/${id}`);
  this.getUserinfo()
 },
// 弹出修改用户对话框
 editUser(userinfo){
 this.dialogTableVisibleEdit=true
 this.editForm=userinfo
},
// 修改弹窗确认按钮
async editSure(){
 this.dialogTableVisibleEdit=false
 const res = await this.$http.put(`users/${this.editForm.id}`)
 console.log(res);
   const {meta:{status,msg},data}=res.data
  if(status===200){
    this.$message.success(msg)
  }else{
    this.$message.warning(msg)
  }
},
// 修改弹窗取消按钮 
closeEdit(){
  this.dialogTableVisibleEdit=false
},
 // 修改用户的状态
async editStatus(userstatus,id){
  console.log(userstatus,id);
  // 调用修改用户状态的接口
  const res= await this.$http.put(`users/${id}/state/${userstatus}`)
   const {meta:{status,msg},data}=res.data
   if(status===200){
     this.$message.success(msg)
   }else{
     this.$message.warning(msg)
   }
},
    // 点击提交用户信息
    submitForm(){
     this.dialogTableVisible=false
     this.addUserinfo()
    },
    // 关闭添加的对话框
    closeForm(){
      this.dialogTableVisible=false
    },
    // 封装提交用户信息的请求
 async addUserinfo(){
   const res=  await this.$http.post('users',this.formLabelAlign)    
  const {meta:{status,msg},data}=res.data
  if(status===201){
    // 提示
    this.$message.success(msg)
    this.getUserinfo()
    for(const key in this.formLabelAlign){
      if(this.formLabelAlign.hasOwnProperty(key)){
        this.formLabelAlign[key]=""
      }
    }
  }else{
    this.$message.warning(msg)
  }

 },

    // 清空搜索框，重新获取
    loadUserlist(){
      this.getUserinfo()
    },
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
      // 展示添加对话框
      showDialog(){
        this.dialogTableVisible=true
      },

    async getUserinfo() {
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
.roleBtn{
margin: 20px 0px 0 200px;
}
</style>
