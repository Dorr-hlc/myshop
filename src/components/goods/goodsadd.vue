<template>
  <el-card class="mybox">
    <myBread leavel1="商品管理" leavel2="商品列表"></myBread>
    <!-- 提示 -->
    <el-alert
      class="alert"
      title="添加商品信息"
      type="success"
      center
      show-icon
    >
    </el-alert>

    <!-- 步骤条 -->
    <el-steps
      :active="1 * active"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 左侧tabs -->
    <!-- 最外层是el-form -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      class="my_form"
    >
      <el-tabs
        v-model="active"
        :tab-position="tabPosition"
        @tab-click="tabChange"
      >
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              v-model="value"
              :options="options"
              :props="defaultProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <!-- 该三级分类的商品参数 -->
          <el-form-item
            :label="item.attr_name"
            v-for="(item, index) in arryData"
            :key="index"
          >
            <!-- 复选框组 -->
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                border
                :label="item1"
                v-for="(item1, i) in item.attr_vals"
                :key="i"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <!-- 静态参数 -->
          <el-form-item
            :label="item.attr_name"
            v-for="(item, a) in arryStatic"
            :key="a"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
           <el-upload
            class="upload-demo"
            :headers="headers"
            action="http://127.0.0.1:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <!-- 表单元素 -->
            <el-button type="primary">点我-添加商品</el-button>
            <!-- 富文本 -->
            <quillEditor></quillEditor>
          </el-form-item>
           </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
       import "quill/dist/quill.core.css";
       import "quill/dist/quill.snow.css";
       import "quill/dist/quill.bubble.css";
// goods_name商品名称不能为空goods_cat以为','分割的分类列表不能为空goods_price价格不能为空goods_number
// 数量不能为空goods_weight重量不能为空goods_introduce介
// 绍可以为空pics上传的图片临时路径（对象）可以为空attrs商品的参数
// （数组），包含 `动态参数` 和 `静态属性`可以为空
export default {
  components:{
    quillEditor
  },
  data() {
    return {
      tabPosition: "left",
      active: "1",
      // 添加商品的表单数据
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: "",
      },
      //   级联选择器绑定的数据
      options: [],
      value: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      checkList: [],
      // 动态参数的数据
      arryData: [],
      // 静态参数的数据
      arryStatic: [],
      fileList:[],
      // 图片上传头部
      headers:{
        Authorization:localStorage.getItem("token")
      }
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
  //  图片上传时需要用到的相关方法
  handlePreview(file){},
  handleRemove(file){},
  handleSuccess(file){},
    //   点击不同的tab触发不同的方法
    async tabChange() {
      //    只是点击第二个tabs，并且三级分类有值
      if (this.active === "2") {
        if (this.value.length < 2) {
          this.$message.warning("请先选择商品的分类");
          return;
        } else {
          const res = await this.$http.get(
            `categories/${this.value[2]}/attributes?sel=many`
          );
          console.log(res);
          this.arryData = res.data.data;
          //   字符串转换为数组
          this.arryData.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0
                ? []
                : item.attr_vals.trim().split(",");
          });
        }
      } else if (this.active === "3") {
        if (this.value.length < 2) {
          this.$message.warning("请先选择商品的分类");
          return;
        } else {
          const res = await this.$http.get(
            `categories/${this.value[2]}/attributes?sel=only`
          );
          this.arryStatic = res.data.data;
        }
      }
    },
    handleChange() {},
    //   获取商品的三级分类信息
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      this.options = res.data.data;
    },
  },
};
</script>
<style scoped>
.alert {
  margin-top: 20px;
}
.my_form {
  height: 100%;
  overflow: auto;
}
.mybox {
  height: 100%;
}
    .quill-editor{
        height:300px;
    }
</style>
