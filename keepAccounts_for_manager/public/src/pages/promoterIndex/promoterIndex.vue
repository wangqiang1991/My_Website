<template>
  <div id="promoters_vue" class="app-container calendar-list-container" style="padding:16px;background:#fff;">
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
        // title: {
        //   left: 'center',
        //   text: '大数据量面积图',
        // },
        xAxis: {
          name:"日期",
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          padding: [5, 10]
        },
        yAxis: {
          name:"打卡人数",
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['公司1', '公司2']
        },
        series: [{
          name: '公司1',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
          data: data1,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '公司2',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            }
          },
          label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
          data: data2,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>

<style lang="scss">

</style>
