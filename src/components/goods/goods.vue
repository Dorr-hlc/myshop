<template>
  <el-card>
    <!-- 面包屑 -->
    <myBread leavel1="商品管理" leavel2="商品列表"></myBread>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          @clear="loadUserlist"
          placeholder="请输入名称"
          v-model="query"
          class="inputSearch"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchGoods"
          ></el-button>
        </el-input>
        <el-button type="success" @click="showDialog">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="goodslist" style="width: 100%" height="700px">
      <el-table-column label="#" width="180" type="index"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="500">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品量"> </el-table-column>
      <el-table-column label="创建日期">
        <!-- 在单元格中展示非文本数据使用过滤器的时候需要这样 使用，row表示userlist数组中的每一项，需要使用slot-scoped传值 -->
        <template slot-scope="goodslist">{{
          goodslist.row.upd_time | formdata
        }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editGoods(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteGoods(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.page.pagenum"
      :page-sizes="[50, 80, 120, 150]"
      :page-size="this.page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      goodslist: [],
      page: {
        pagenum: 1,
        pagesize: 100,
      },
      total: 0,
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //   清空搜索框，重新获取数据
    loadUserlist() {
      this.getGoodsList();
    },
    editGoods(id) {
     console.log(id);
    },
    //  展示添加商品对话框
    showDialog() {},
    // 搜索商品
    async searchGoods() {
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.page.pagenum}&pagesize=${this.page.pagesize}`
      );
      this.goodslist = res.data.data.goods;
    },
    // 获取商品数据
    async getGoodsList() {
      const res = await this.$http.get(
        `goods?pagenum=${this.page.pagenum}&pagesize=${this.page.pagesize}`
      );
      console.log(res);
      this.total = res.data.data.total;
      this.goodslist = res.data.data.goods;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 重新获取数据
      this.page.pagesize = val;
      this.page.pagenum = 1;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 改变当前页码，然后重新调用函数
      this.page.pagenum = val;
      this.getGoodsList();
    },
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
.page {
  margin-top: 20px;
}
.roleBtn {
  margin: 20px 0px 0 200px;
}
</style>