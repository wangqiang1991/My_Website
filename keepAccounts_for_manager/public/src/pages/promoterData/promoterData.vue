<template>
  <div id="promotersData_vue" class="app-container calendar-list-container" style="padding:16px;background:#fff;">
    <p style="text-align:center;"><el-button type="primary" @click="change">转换数据</el-button> </p>
    <div id="chart1" class="chart_div" style="width:95%;height:450px;"></div>
  </div>
</template>

<script>
import echarts from "echarts"
import echartTheme from '@/utils/echartTheme'

export default {
  data() {
    return {
      chart:null,
      data1: [100, 120, 161, 134, 105, 160, 165],
      data2: [120, 82, 91, 154, 162, 0, 0],
    }
  },
  mounted() {
    echarts.registerTheme('dark', echartTheme);
    this.chart = echarts.init(document.getElementById('chart1'),'dark');

    this.setChar(this.data1,this.data2);
  },
  methods: {
    change() {
      let tem = null;
      tem = this.data1;
      this.data1 = this.data2;
      this.data2 = tem;
      this.chart.clear();
      this.setChar(this.data1,this.data2);
    },
    setChar(data1,data2) {

        this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          align: 'left',
          data: ['公司1', '公司2']
        },
        xAxis: [{
          name:"日期",
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          name:'打卡人数',
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '公司1',
          type: 'bar',
          data: data1,
          label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
          animationDuration:6000
        }, {
          name: '公司2',
          type: 'bar',
          data: data2,
          label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
          animationDuration:6000
        }]
      })
    }
  }
}
</script>

<style lang="scss">

</style>
