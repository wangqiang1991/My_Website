<template>
  <div id="account_vue"  class="app-container calendar-list-container">
   <!--  <p style="text-align:center;"><el-button type="primary" @click="change">转换数据</el-button> </p>
    <div id="chart1" class="chart_div" style="width:95%;height:450px;"></div> -->

    <el-table
      v-loading="user.loading"
      element-loading-text="努力加载中..."
      border
      :data="user.data"
      style="width: 100%">

      <el-table-column type="index" align="center" label="序号" width="65">
      </el-table-column>

      <el-table-column
        label="用户名称"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="用户密码">
        <template slot-scope="scope">
          <span>{{ scope.row.pwd }}</span>
        </template>
      </el-table-column>


      <el-table-column
        label="操作"
        align="center"
        width="250">
        <template slot-scope="scope">
          <el-button size="small"  type="primary" @click="loadUserDetail(scope.row)">查看明细</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      title="用户消费明细"
      :visible.sync="dialogVisible"
      width="80%">

      <el-row :gutter="24" style='margin-bottom:15px;'>

        <el-col :span="8">
          <div class="count">
            <p class="tip">{{time.year}}年度支出</p>
            <p class="number" style="color:#f75151;">¥{{(Math.abs(yearAccount.allPay)).toFixed(2)}}</p>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="count">
            <p class="tip">{{time.year}}年度收入</p>
            <p class="number" style="color:#008000;">¥{{(yearAccount.allEarn).toFixed(2)}}</p>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="count">
            <p class="tip">{{time.year}}年度合计</p>
            <p class="number">¥{{(yearAccount.allEarn - Math.abs(yearAccount.allPay)).toFixed(2)}}</p>
          </div>
        </el-col>
       
      </el-row>      

      <!-- 折线图容器 -->
      <div id="chart" class="chart_div"></div> 
      
      <div style="margin-bottom:15px;margin-top:15px;">
        <el-date-picker
          @change="doSearch"
          v-model="time.value"
          type="month"
          placeholder="选择查询月份">
        </el-date-picker>

        <el-button style="margin-left: 12px;" type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>

      </div>

      <el-row :gutter="24" style='margin-bottom:15px;'>

        <el-col :span="8">
          <div class="count">
            <p class="tip">{{time.year}}年{{time.month}}月支出</p>
            <p class="number" style="color:#f75151;">¥{{(Math.abs(monthAccount.allPay)).toFixed(2)}}</p>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="count">
            <p class="tip">{{time.year}}年{{time.month}}月收入</p>
            <p class="number" style="color:#008000;">¥{{(monthAccount.allEarn).toFixed(2)}}</p>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="count">
            <p class="tip">{{time.year}}年{{time.month}}月合计</p>
            <p class="number">¥{{(monthAccount.allEarn - Math.abs(monthAccount.allPay)).toFixed(2)}}</p>
          </div>
        </el-col>
       
      </el-row>   

      <h3>消费明细</h3>
      <el-table
        v-loading="monthAccount.loading"
        element-loading-text="努力加载中..."
        border
        :data="monthAccount.data"
        style="width: 100%">

        <el-table-column type="index" align="center" label="序号" width="65">
        </el-table-column>

        <el-table-column
          label="日期"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.year }}-{{ scope.row.month }}-{{ scope.row.day }}  {{scope.row.time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="消费类型"
          align="center">
          <template slot-scope="scope">
            <span style="color:green" v-if='+scope.row.money > 0'>收入</span>
            <span style="color:#f75151;" v-else>支出</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="金额">
          <template slot-scope="scope">
            <span style="color: green;" v-if='+scope.row.money > 0'>¥{{ scope.row.money }}</span>
            <span style="color: #f75151;" v-else>¥{{ scope.row.money.slice(1) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="消费备注"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          width="250">
          <template slot-scope="scope">
            <el-button  type="danger" @click="deleteAccount(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div class="pagination-container">
        <el-pagination 
          background
          @size-change="handleSizeChange" 
          :current-page="query.pageIndex"
          @current-change="handleCurrentChange" 
          :page-sizes="[10,15,20,30]"
          :page-size="query.pageSize" 
          layout="total, sizes, prev, pager, next, jumper"
          :total="query.total">
        </el-pagination>
      </div>

      <div  slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import echarts from "echarts"
import echartTheme from '@/utils/echartTheme'
export default {
  data() {
    return {
      chart:null,
      chartInit:true,
      data1: [100, 120, 161, 134, 105, 160, 165],
      data2: [120, 82, 91, 154, 162, 0, 0],
      lastYear:null,
      dialogVisible:false,
      userId:null,
      time:{
        value:null,
        defaultYear:null,
        defaultMonth:null,
        year:null,
        month:null
      },
      user:{
        loading:true,
        data:[]
      },
      query:{
        loading:true,
        year:null,
        month:null,
        pageIndex: 1,
        pageSize: 10,
        total:0,
      },
      yearAccount:{
        allEarn:0,
        allPay:0,
        earnData:[],
        payData:[],
        Time:[]
      },
      monthAccount:{
        loading:true,
        allEarn: 0,
        allPay: 0,
        data:[],
      }
    }
  },
  mounted() {
    // echarts.registerTheme('dark', echartTheme);
    // this.chart = echarts.init(document.getElementById('chart1'),'dark');
    // this.setChar(this.data1,this.data2);
    this.findUser();
    let time = new Date();
    this.time.defaultYear = time.getFullYear();
    this.time.defaultMonth = time.getMonth() + 1;
  },
  methods: {
    findUser() {
      this.user.loading = true;
      this.http.get(this).url(this.config.findByUser).params({}).request(function(response) {
        this.user.loading = false;
        this.user.data = response.data;
      }, function(error) {
        console.log(error);
        this.user.loading = false;
        this.$message.error(error);
      });
    },
    reset() {
      this.time.value = null;
      this.query.pageIndex = 1;
    },
    loadUserDetail(userData) {
      this.dialogVisible = true;
      this.userId = userData._id;
      this.reset();
      this.findByMonthAccount();
      setTimeout(()=>{
        if (this.chartInit) {
          this.chartInit = false;
          this.chart = echarts.init(document.getElementById('chart'))
        }
        this.findByYearAccount();
      },100)
    },
    findByYearAccount() {
      this.chart.clear();
      let userId = this.userId;
      let year = null;
      if (!this.time.value) {
        year = this.time.defaultYear;
      } else {
        year = this.time.value.getFullYear();
      }
      this.lastYear = year;
      let params = {};
      params.userId = userId;
      params.year = year;

      this.http.get(this).url(this.config.yearAccount).params(params).request(function(response) {
        
        let monthData = ['1','2','3','4','5','6','7','8','9','10','11','12'];
        let resultdata = response.data;
      
        let allEarn = 0;
        let allPay = 0;
        /*统计一年内数据*/
        resultdata.forEach((resItem)=>{
          let money = +resItem.money;
          if ( money > 0) {
            allEarn += money;
          } else {
            allPay += money;
          }
        })
        this.yearAccount.allEarn = allEarn;
        this.yearAccount.allPay = allPay;

        let earnData = [];
        let payData = [];
        /*统计线形图数据*/
        monthData.forEach((monthItem)=>{
          let monthEarn = 0;
          let monthPay = 0;
          resultdata.forEach((resItem)=>{

            if (monthItem == resItem.month) {
              let money = +resItem.money;
              if ( money > 0) {
                monthEarn += money;
              } else {
                monthPay += money;
              }
            }

          })
          earnData.push(monthEarn.toFixed(2));
          payData.push((Math.abs(monthPay)).toFixed(2))
        })

        this.yearAccount.earnData = earnData;
        this.yearAccount.payData = payData;
        this.setChar(this.yearAccount.earnData,this.yearAccount.payData);

      }, function(error) {
        console.log(error);
        this.$message.error(error);
      });
    },
    doSearch() {
      this.query.pageIndex = 1;
      this.findByMonthAccount();
      this.findByYearAccount();
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.findByMonthAccount();
    },
    handleCurrentChange(val) {
      this.query.pageIndex = val;
      this.findByMonthAccount();
    },
    findByMonthAccount() {      
      let year = null;
      let month = null;
      if (!this.time.value) {
        year = this.time.defaultYear;
        month = this.time.defaultMonth;
      } else {
        year = this.time.value.getFullYear();
        month = this.time.value.getMonth() + 1;
      }
      let params = {};
      params.userId = this.userId;
      params.year = year;
      params.month = month;
      params.pageIndex = this.query.pageIndex;
      params.pageSize = this.query.pageSize;
      this.time.year = year;
      this.time.month = month;
      this.monthAccount.loading = true;

      this.http.get(this).url(this.config.findMonthAccount).params(params).request(function(response) {
        
        this.monthAccount.data = response.data.data;
        this.monthAccount.allEarn = response.data.monthMoney.allEarn;
        this.monthAccount.allPay = response.data.monthMoney.allPay;
        this.monthAccount.loading = false;
        this.query.total = response.data.count;
      }, function(error) {
        console.log(error);
        this.monthAccount.loading = false;
        this.$message.error(error);
      });
    },
    deleteAccount(accountDataItem) {
      this.$confirm('该条消费明细将永久删除，且不可恢复! 确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: "el-button--danger"
      }).then(() => {

        this.http.post(this).url(this.config.deteleAccount).params({accountId:accountDataItem._id}).request(function(response) {
            this.findByMonthAccount();
            this.findByYearAccount();
        }, function(error) {
          console.log(error);
          this.$message.error(error);
        });

      }).catch(() => {});
    },
    setChar(earnData,payData) {

        this.chart.setOption({
        xAxis: {
          name:"月份",
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
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
          name:"金额(元)",
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['收入', '支出']
        },
        series: [{
          name: '收入',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#008000',
              lineStyle: {
                color: '#008000',
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
          data: earnData,
          animationDuration: 2500,
          animationEasing: 'cubicInOut'
        },
        {
          name: '支出',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#f75151',
              lineStyle: {
                color: '#f75151',
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
          data: payData,
          animationDuration: 2500,
          animationEasing: 'quadraticOut'
        }]
      })

    }
  }
}
</script>

<style lang="scss">
#account_vue{
  p{
    margin: 0;
  }
  .count{
    padding: 15px 8px;
    border:1px solid #ddd;
    color:#343434;
    .tip{
      font-size: 16px;
      text-align: center;
      margin-bottom:10px;
    }
    .number{
      font-size:20px;
      color: #FF9800;
      text-align:center;
      font-weight: 700;
    }
  }
  .chart_div{
    width:100%;
    @media screen and (max-width: 1500px){
      height: 400px;
    }
    @media screen and (min-width: 1500px){
      height: 600px;
    }
  }
}
</style>
