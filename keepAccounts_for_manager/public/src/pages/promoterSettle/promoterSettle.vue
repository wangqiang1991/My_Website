<template>
  <div id="promoterSettle_vue" class="app-container calendar-list-container" style="padding:16px;background:#fff;">
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
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        calculable: true,
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss">

</style>
