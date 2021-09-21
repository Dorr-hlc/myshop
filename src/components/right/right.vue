<template>
 <el-card class="mycard">
     <!-- 面包屑 -->
<div>
    <myBread leavel1="权限管理" leavel2="权限列表"></myBread>
</div>
     <!-- 表格 -->
       <el-table
    :data="rightsData"
    border
    height="700px"
    class="mytable"
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
       >
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      >
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
        <el-table-column
      label="层级">
      <template slot-scope="scope">
          <!-- 根据返回的文本渲染不同的层级 -->
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
 </el-card>
</template>
<script>
export default {
    data(){
        return{
         rightsData:[]
        }
    },
    created(){
    this.getRightlist()
    },
    methods:{
        async getRightlist(){
            const res = await this.$http.get(`rights/list`)
            this.rightsData=res.data.data
        }
    }
}
</script>
<style scoped>
.mycard{
    height: 100%;
}
.mytable{
    margin-top: 20px;

}
</style>