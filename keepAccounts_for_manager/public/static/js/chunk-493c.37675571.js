(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-493c"],{CePv:function(t,e,a){"use strict";a.r(e);var n=a("MT78"),i=a.n(n),o=(a("Xm2N"),{data:function(){return{chart:null,chartInit:!0,selectTypeData:[{type:1,name:"收入大于"},{type:2,name:"支出大于"}],lastYear:null,dialogVisible:!1,userId:null,time:{value:null,defaultYear:null,defaultMonth:null,year:null,month:null},user:{loading:!0,data:[]},query:{type:null,money:null,loading:!0,year:null,month:null,pageIndex:1,pageSize:10,total:0},yearAccount:{allEarn:0,allPay:0,earnData:[],payData:[],Time:[]},monthAccount:{loading:!0,allEarn:0,allPay:0,data:[]}}},mounted:function(){this.findUser();var t=new Date;this.time.defaultYear=t.getFullYear(),this.time.defaultMonth=t.getMonth()+1},methods:{findUser:function(){this.user.loading=!0,this.http.get(this).url(this.config.findByUser).params({}).request(function(t){this.user.loading=!1,this.user.data=t.data},function(t){console.log(t),this.user.loading=!1,this.$message.error(t)})},reset:function(){this.time.value=null,this.query.pageIndex=1,this.query.type=null,this.query.money=null},loadUserDetail:function(t){var e=this;this.dialogVisible=!0,this.userId=t._id,this.reset(),this.findByMonthAccount(),setTimeout(function(){e.chartInit&&(e.chartInit=!1,e.chart=i.a.init(document.getElementById("chart"))),e.findByYearAccount()},100)},findByYearAccount:function(){this.chart.clear();var t=this.userId,e=null;e=this.time.value?this.time.value.getFullYear():this.time.defaultYear,this.lastYear=e;var a={};a.userId=t,a.year=e,this.http.get(this).url(this.config.yearAccount).params(a).request(function(t){var e=t.data,a=0,n=0;e.forEach(function(t){var e=+t.money;e>0?a+=e:n+=e}),this.yearAccount.allEarn=a,this.yearAccount.allPay=n;var i=[],o=[];["1","2","3","4","5","6","7","8","9","10","11","12"].forEach(function(t){var a=0,n=0;e.forEach(function(e){if(t==e.month){var i=+e.money;i>0?a+=i:n+=i}}),i.push(a.toFixed(2)),o.push(Math.abs(n).toFixed(2))}),this.yearAccount.earnData=i,this.yearAccount.payData=o,this.setChar(this.yearAccount.earnData,this.yearAccount.payData)},function(t){console.log(t),this.$message.error(t)})},doSearch:function(){this.query.pageIndex=1,this.findByMonthAccount(),this.findByYearAccount()},handleSizeChange:function(t){this.query.pageSize=t,this.findByMonthAccount()},handleCurrentChange:function(t){this.query.pageIndex=t,this.findByMonthAccount()},findByMonthAccount:function(){var t=null,e=null;this.time.value?(t=this.time.value.getFullYear(),e=this.time.value.getMonth()+1):(t=this.time.defaultYear,e=this.time.defaultMonth);var a={};if(a.userId=this.userId,a.year=t,a.month=e,a.pageIndex=this.query.pageIndex,a.pageSize=this.query.pageSize,this.time.year=t,this.time.month=e,this.query.type){if(!this.query.money||Number(this.query.money)<=0)return void this.$message({type:"warning",message:"金额不能为空且不为负"});1==this.query.type?(a.type=1,a.money=Number(this.query.money)):2==this.query.type&&(a.type=2,a.money=Number(this.query.money))}else a.type=0;this.monthAccount.loading=!0,this.http.get(this).url(this.config.findMonthAccount).params(a).request(function(t){this.monthAccount.data=t.data.data,this.monthAccount.allEarn=t.data.monthMoney.allEarn,this.monthAccount.allPay=t.data.monthMoney.allPay,this.monthAccount.loading=!1,this.query.total=t.data.count},function(t){console.log(t),this.monthAccount.loading=!1,this.$message.error(t)})},deleteAccount:function(t){var e=this;this.$confirm("该条消费明细将永久删除，且不可恢复! 确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",confirmButtonClass:"el-button--danger"}).then(function(){e.http.post(e).url(e.config.deteleAccount).params({accountId:t._id}).request(function(t){this.findByMonthAccount(),this.findByYearAccount()},function(t){console.log(t),this.$message.error(t)})}).catch(function(){})},setChar:function(t,e){this.chart.setOption({xAxis:{name:"月份",data:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],boundaryGap:!1,axisTick:{show:!1}},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}},padding:[5,10]},yAxis:{name:"金额(元)",axisTick:{show:!1}},legend:{data:["收入","支出"]},series:[{name:"收入",smooth:!0,type:"line",itemStyle:{normal:{color:"#008000",lineStyle:{color:"#008000",width:2}}},label:{normal:{show:!0,position:"top"}},data:t,animationDuration:2500,animationEasing:"cubicInOut"},{name:"支出",smooth:!0,type:"line",itemStyle:{normal:{color:"#f75151",lineStyle:{color:"#f75151",width:2}}},label:{normal:{show:!0,position:"top"}},data:e,animationDuration:2500,animationEasing:"quadraticOut"}]})}}}),l=(a("Vsc+"),a("KHd+")),s=Object(l.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container calendar-list-container",attrs:{id:"account_vue"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.user.loading,expression:"user.loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"努力加载中...",border:"",data:t.user.data}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"序号",width:"65"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.username))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"用户密码"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.pwd))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.loadUserDetail(e.row)}}},[t._v("查看明细")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"用户消费明细",visible:t.dialogVisible,width:"80%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-row",{staticStyle:{"margin-bottom":"15px"},attrs:{gutter:24}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"count"},[a("p",{staticClass:"tip"},[t._v(t._s(t.time.year)+"年度支出")]),t._v(" "),a("p",{staticClass:"number",staticStyle:{color:"#f75151"}},[t._v("¥"+t._s(Math.abs(t.yearAccount.allPay).toFixed(2)))])])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"count"},[a("p",{staticClass:"tip"},[t._v(t._s(t.time.year)+"年度收入")]),t._v(" "),a("p",{staticClass:"number",staticStyle:{color:"#008000"}},[t._v("¥"+t._s(t.yearAccount.allEarn.toFixed(2)))])])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"count"},[a("p",{staticClass:"tip"},[t._v(t._s(t.time.year)+"年度合计")]),t._v(" "),a("p",{staticClass:"number"},[t._v("¥"+t._s((t.yearAccount.allEarn-Math.abs(t.yearAccount.allPay)).toFixed(2)))])])])],1),t._v(" "),a("div",{staticClass:"chart_div",attrs:{id:"chart"}}),t._v(" "),a("div",{staticStyle:{"margin-bottom":"15px","margin-top":"15px"}},[a("el-date-picker",{attrs:{type:"month",placeholder:"选择查询月份"},on:{change:t.doSearch},model:{value:t.time.value,callback:function(e){t.$set(t.time,"value",e)},expression:"time.value"}}),t._v(" "),a("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择查询金额类型"},model:{value:t.query.type,callback:function(e){t.$set(t.query,"type",e)},expression:"query.type"}},t._l(t.selectTypeData,function(t){return a("el-option",{key:t.type,attrs:{label:t.name,value:t.type}})})),t._v(" "),a("el-input",{staticStyle:{width:"150px"},attrs:{type:"number",placeholder:"输入查询金额"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.doSearch()}},model:{value:t.query.money,callback:function(e){t.$set(t.query,"money",e)},expression:"query.money"}}),t._v(" "),a("el-button",{staticStyle:{"margin-left":"12px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.doSearch}},[t._v("查询")])],1),t._v(" "),a("el-row",{staticStyle:{"margin-bottom":"15px"},attrs:{gutter:24}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"count"},[a("p",{staticClass:"tip"},[t._v(t._s(t.time.year)+"年"+t._s(t.time.month)+"月支出")]),t._v(" "),a("p",{staticClass:"number",staticStyle:{color:"#f75151"}},[t._v("¥"+t._s(Math.abs(t.monthAccount.allPay).toFixed(2)))])])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"count"},[a("p",{staticClass:"tip"},[t._v(t._s(t.time.year)+"年"+t._s(t.time.month)+"月收入")]),t._v(" "),a("p",{staticClass:"number",staticStyle:{color:"#008000"}},[t._v("¥"+t._s(t.monthAccount.allEarn.toFixed(2)))])])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"count"},[a("p",{staticClass:"tip"},[t._v(t._s(t.time.year)+"年"+t._s(t.time.month)+"月合计")]),t._v(" "),a("p",{staticClass:"number"},[t._v("¥"+t._s((t.monthAccount.allEarn-Math.abs(t.monthAccount.allPay)).toFixed(2)))])])])],1),t._v(" "),a("h3",[t._v("消费明细")]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.monthAccount.loading,expression:"monthAccount.loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"努力加载中...",border:"",data:t.monthAccount.data}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"序号",width:"65"}}),t._v(" "),a("el-table-column",{attrs:{label:"日期",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.year)+"-"+t._s(e.row.month)+"-"+t._s(e.row.day)+"  "+t._s(e.row.time))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"消费类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[+e.row.money>0?a("span",{staticStyle:{color:"green"}},[t._v("收入")]):a("span",{staticStyle:{color:"#f75151"}},[t._v("支出")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[+e.row.money>0?a("span",{staticStyle:{color:"green"}},[t._v("¥"+t._s(e.row.money))]):a("span",{staticStyle:{color:"#f75151"}},[t._v("¥"+t._s((e.row.money+"").slice(1)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"消费备注",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.remark))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"danger"},on:{click:function(a){t.deleteAccount(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":t.query.pageIndex,"page-sizes":[10,15,20,30],"page-size":t.query.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.query.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("关 闭")])],1)],1)],1)},[],!1,null,null,null);s.options.__file="homeIndex.vue";e.default=s.exports},"Vsc+":function(t,e,a){"use strict";var n=a("ZABd");a.n(n).a},Xm2N:function(t){t.exports={}},ZABd:function(t,e,a){}}]);