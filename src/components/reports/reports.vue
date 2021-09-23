<template>
  <el-card>
    <!-- 面包屑 -->
    <myBread leavel1="数据统计" leavel2="数据报表"></myBread>
    <!-- echarts容器 -->
    <div id="main" style="width:700px; height:200px"></div>
  </el-card>
</template>
<script>
import * as myEcharts from 'echarts'
export default {
  data() {
    return {};
  },
  mounted(){
  this.useEcharts()
  },
  methods: {
  async useEcharts() {
      //  init
      var myChart = myEcharts.init(document.getElementById("main"));
    // 获取数据
    const res= await this.$http.get(`reports/type/1`)
    // console.log(res);
   let option2 =res.data.data

      // options
      let option1 = {
        title: {
          text: "营销区域图",
        },
        tooltip: {
          
        },

        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "3%",
          containLabel: true,
        },
      };
let option={...option1,...option2}
      // /setoptions
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
#main{
    margin-top: 20px;
}
</style>
