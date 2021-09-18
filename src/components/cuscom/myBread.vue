<template>
  <!-- 面包屑 -->
   <el-breadcrumb separator="/">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{leavel1}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{leavel2}}</el-breadcrumb-item>
</el-breadcrumb>
</template>
<script>

export default {
    // 其中的leavel1，leavel2
      props:[
        'leavel1',
        'leavel2'
    ],
    data(){
      return{}
    },
  
}
</script>
<style scoped>

</style>