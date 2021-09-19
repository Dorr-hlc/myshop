<template>
  <el-card>
    <!-- 面包屑 -->
    <myBread leavel1="权限管理" leavel2="角色列表"></myBread>
    <el-row class="addBtn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="roleData" style="width: 100%" class="mytable">
      <!-- 展开行 -->
      <el-table-column width="180" type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item, i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                class="thrid"
                @close="deleteRight(scope.row, item.id)"
                closable
                type="success"
                >{{ item.authName }}</el-tag
              >
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item1, a) in item.children" :key="a">
                <el-col :span="4">
                  <el-tag
                    class="thrid"
                    @close="deleteRight(scope.row, item1.id)"
                    type="warning"
                    closable
                  >
                    {{ item1.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    class="thrid"
                    @close="deleteRight(scope.row, item2.id)"
                    closable
                    v-for="(item2, q) in item1.children"
                    :key="q"
                  >
                    {{ item2.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" width="180" type="index"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="280">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="280">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editRole(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteRole(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="giveRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogVisibleRole" width="30%">
      <!-- 树形结构 -->
      <el-tree
         ref="tree"
        :data="treeData"
        show-checkbox 
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedData"
        default-expand-all
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      roleData: [],
      dialogVisibleRole: false,
      treeData: [],
      //   指定树形结构的数据名
      defaultProps: {
        label: "authName",
        children: "children",
      },
      arrexpand: [],
      checkedData: [],
      currentId:0
    };
  },
  created() {
    this.getRightlist();
  },
  methods: {
    //   修改权限
  async setRole(){
    //   获取全选的数组
    let arry1 =  this.$refs.tree.getCheckedKeys()
    // 获取半选的数组
    let arry2 =  this.$refs.tree.getHalfCheckedKeys()
    // 展开对象符
    let arr=[...arry1,...arry2]
    console.log(arr);
    const res=await this.$http.post(`roles/${this.currentId}/rights`,{
        rids:arr.join(',')
    })
    this.dialogVisibleRole=false
    this.getRightlist()
    this.$message.success('更新成功')
    },
    giveRole(user) {
      //   弹出对话框
      this.currentId=user.id
      this.dialogVisibleRole = true;
      this.getRightTree(user);
      console.log(user);
    },
    // 取消权限
    async deleteRight(role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      // 只更新当前表格，不刷新整个表格
      role.children = res.data.data;
      this.$message.success("删除成功");
    },
    // 列表结构的数据
    async getRightlist() {
      const res = await this.$http.get(`roles`);
      this.roleData = res.data.data;
    },
    // 树形结构的数据
    async getRightTree(role) {
      const res = await this.$http.get(`rights/tree`);
      this.treeData = res.data.data;
      //   获取当前已经勾选的节点
      let arrtemp = [];
      role.children.forEach(item1 => {
        arrtemp.push(item1.id);
        item1.children.forEach(item2 => {
          arrtemp.push(item2.id);
          item2.children.forEach(item3 => {
            arrtemp.push(item3.id);
          });
        });
      });
    //   赋值给已选择的权限
      this.checkedData = arrtemp;
    },
  },
};
</script>
<style scoped>
.addBtn {
  margin-top: 20px;
}
.mytable {
  margin: 0 auto;
}
.thrid {
  margin: 10px 10px;
}
</style>