//6.输入备注时的一个常用词汇，
//7.注册登录的提示 在检查一遍，
//8.数据库的自启动，数据库的备份，



//展示金额录入框
$('#showInput').click(()=>{
	var date = new Date();
	$('#time').html('当前时间:'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())
	//$('.input_money').addClass('showInput');
})

//点击账单跳转
$('#account').click(()=>{
	window.location.href = '/home.html';
})
//点击联系站长跳转
$('#contact_me').click(()=>{
	window.location.href = '/contact.html';
})
//退出登录
$('#logout').click(()=>{
	$.ajax({
		type:'get',
		url:'/users/logout',
		success:()=>{
			window.location.href = '/index.html';
		}
	})
})



//获取当前时间
let myDate=new Date();
let year = myDate.getFullYear();
let month = myDate.getMonth()+1;
let day = myDate.getDate();
let moneyData = null;

$('#year option[value='+year+']').attr("selected",true);
$('#month option[value='+month+']').attr("selected",true);
//$('#day option[value='+day+']').attr("selected",true);


//初始化获取session里面的数据
let url = window.location.href;
let session_user =  url.slice(url.lastIndexOf('/')+1,url.lastIndexOf('.'))
let userData = null;
if(session_user == 'home' || session_user == 'contact'){
	$.ajax({
	type:'get',
	url:'/users/getSession',
	success:(data)=>{
		//console.log(data._id)
		if(data._id == undefined){
			window.location.href = '/index.html';
		}else{
			userData = data;
			let myDate=new Date();
			let year = myDate.getFullYear();
			let month = myDate.getMonth()+1;
			findMonthMoney(year,month,data._id);
		}
	}
 })
}

//提交建议
$('#submit').click(function(){
	let content = $('#contact_content').val();
	if(content == '' || content == null){
		$('.tip').html('内容不能为空');
		$('.tip').css({'color':'#ff6d6d'})
		return ;
	}
	$.ajax({
		type:'get',
		url:'/index/contactme',
		data:{
			userId:userData._id,
			contact:content
		},
		success:()=>{
			$('.tip').html('成功提交');
			$('.tip').css({'color':'green'});
			$('#submit').hide();
		}
	})
})

//查询详情
$('body').on('click','.moneyDetail',function(){
	$('#detailTable').html('')
	var _time = $(this).attr('datatime').split('-');
	var data = [];

	for(var i = 0;i<moneyData.moneyData.length;i++){
		if(_time[0] == moneyData.moneyData[i].year && _time[1] == moneyData.moneyData[i].month && _time[2] == moneyData.moneyData[i].day){
			data.push(moneyData.moneyData[i]) 
		}
	}

	for(var i=0;i<data.length;i++){
		var tr;
		if(data[i].money > 0){
			 tr = `<tr><td>${data[i].year}-${data[i].month}-${data[i].day} ${data[i].time}</td><td>${data[i].remark}</td><td><span class="earn">${Number(data[i].money).toFixed(2)}</span></td></tr>`
		}else{
			 tr = `<tr><td>${data[i].year}-${data[i].month}-${data[i].day} ${data[i].time}</td><td>${data[i].remark}</td><td><span class="pay">${Number(data[i].money).toFixed(2)}</span></td></tr>`
		}
		$('#detailTable').append(tr)
	}
	
})

//详情里面的删除
$('body').on('click','.delete',function(){
	var id = $(this).attr('del_id');
	$.ajax({
		type:'post',
		url:'index/deleteMoney',
		data:{
			id:id
		},
		success:()=>{
			//console.log(123);
			$(this).parent().parent().remove();
			let myDate=new Date();
			let year = myDate.getFullYear();
			let month = myDate.getMonth()+1;
			findMonthMoney(year,month,userData._id);
		}
	})
})

//金额查询
$('#search').click(function(){
	let year = $("#year  option:selected").val();
	let month = $("#month  option:selected").val();
	let day = $("#day  option:selected").val();
	if(day){
		$.ajax({
		type:'get',
		url:'/index/findDayMoney',
		data:{
			year:year,
			month:month,
			day:day,
			userId:userData._id
		},
		success:function(data){
			moneyData = data;

			totalFn(data);

			$('#tableData').html('');
			if(data.moneyData.length == 0){
				var tr =`<td>暂无数据</td><td>暂无数据</td><td>暂无数据</td>`
				$('#tableData').append(tr)
				return ;
			}
			setTable(data.moneyData)
		}
	})

	}else{	
		//console.log(13);
		findMonthMoney(year,month,userData._id);
	}
})

//查询单月账单
function findMonthMoney(year,month,userId){
	$.ajax({
		type:'get',
		url:'/index/findMonthMoney',
		data:{
			year:year,
			month:month,
			userId:userId
		},
		success:(data)=>{
			//console.log(data);
			moneyData = data;
		
			totalFn(data);

			$('#tableData').html('');
			if(data.moneyData.length == 0){
				var tr =`<td>暂无数据</td><td>暂无数据</td><td>暂无数据</td>`
				$('#tableData').append(tr)
				return ;
			}
			setTable(data.moneyData)
		}
	})
}

//统计金额函数
function totalFn (data){

		$('#yaerPay').html(data.yaerMoney.toFixed(2));
		$('#monthPay').html(data.monthMOney.toFixed(2))

		$('#totalEarn').html(data.yearEarn.toFixed(2)).css({'color':'green'});
		$('#totalPay').html(data.yearPay.toFixed(2)).css({'color':'red'});

		$('#totalMEarn').html(data.monthEarn.toFixed(2)).css({'color':'green'});
		$('#totalMPay').html(data.monthPay.toFixed(2)).css({'color':'red'});

		if(data.yaerMoney>0){
			$('#yaerPay').css({'color':'green'});
		}else{
			$('#yaerPay').css({'color':'red'});
		}

		if(data.monthMOney>0){
			$('#monthPay').css({'color':'green'});
		}else{
			$('#monthPay').css({'color':'red'});
		}

}

//渲染数据函数
function setTable (data){

	var year =  data[0].year;
	var month =data[0].month;
	var day = data[0].day;
	var totalMoney = +data[0].money;
	if(data.length == 1){
		var tr;
		if(totalMoney > 0){
			 tr = `<tr><td>${year}-${month}-${day}</td><td><span class="earn">${totalMoney.toFixed(2)}</span></td><td><button type="button" class="btn btn-primary moneyDetail" data-toggle="modal" data-target=".Modal" dataTime="${year}-${month}-${day}">详细</button></td></tr>`
		}else{
			 tr = `<tr><td>${year}-${month}-${day}</td><td><span class="pay">${totalMoney.toFixed(2)}</span></td><td><button type="button" class="btn btn-primary moneyDetail" data-toggle="modal" data-target=".Modal" dataTime="${year}-${month}-${day}">详细</button></td></tr>`
		}
		$('#tableData').append(tr)
	}
	for(var i = 1;i<data.length;i++){
		if(year == data[i].year && month == data[i].month && day == data[i].day){
			totalMoney += +data[i].money;

			if(i == (data.length -1)){
				var tr;
				if(totalMoney > 0){
					 tr = `<tr><td>${year}-${month}-${day}</td><td><span class="earn">${totalMoney.toFixed(2)}</span></td><td><button type="button" class="btn btn-primary moneyDetail" data-toggle="modal" data-target=".Modal" dataTime="${year}-${month}-${day}">详细</button></td></tr>`
				}else{
					 tr = `<tr><td>${year}-${month}-${day}</td><td><span class="pay">${totalMoney.toFixed(2)}</span></td><td><button type="button" class="btn btn-primary moneyDetail" data-toggle="modal" data-target=".Modal" dataTime="${year}-${month}-${day}">详细</button></td></tr>`
				}
				$('#tableData').append(tr)
			}

		}else{
			var tr;
			if(totalMoney > 0){
				 tr = `<tr><td>${year}-${month}-${day}</td><td><span class="earn">${totalMoney.toFixed(2)}</span></td><td><button type="button" class="btn btn-primary moneyDetail" data-toggle="modal" data-target=".Modal" dataTime="${year}-${month}-${day}">详细</button></td></tr>`
			}else{
				 tr = `<tr><td>${year}-${month}-${day}</td><td><span class="pay">${totalMoney.toFixed(2)}</span></td><td><button type="button" class="btn btn-primary moneyDetail" data-toggle="modal" data-target=".Modal" dataTime="${year}-${month}-${day}">详细</button></td></tr>`
			}
			$('#tableData').append(tr)
			
			

			totalMoney = 0;
			year = data[i].year;
			month = data[i].month;
			day = data[i].day;
			totalMoney += +data[i].money;
			if(i == (data.length -1)){
				var tr;
				if(totalMoney > 0){
					 tr = `<tr><td>${year}-${month}-${day}</td><td><span class="earn">${totalMoney.toFixed(2)}</span></td><td><button type="button" class="btn btn-primary moneyDetail" data-toggle="modal" data-target=".Modal" dataTime="${year}-${month}-${day}">详细</button></td></tr>`
				}else{
					 tr = `<tr><td>${year}-${month}-${day}</td><td><span class="pay">${totalMoney.toFixed(2)}</span></td><td><button type="button" class="btn btn-primary moneyDetail" data-toggle="modal" data-target=".Modal" dataTime="${year}-${month}-${day}">详细</button></td></tr>`
				}
				$('#tableData').append(tr)
			}
			
		}
	}
}



//金额添加事件
$('#addmoney_btn').click(()=>{
	let type = $('#payorget>.active>input').val();
	let remark = $('#remark').val();
	let money = +$('#money').val();
	var d = new Date();
	let year = d.getFullYear();
	let month = d.getMonth()+1;
	let day = d.getDate();
	let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
	//console.log(time)
	if(type == undefined){
		$('.typetip').html('请选择账单类型');
		return ;
	}
	if(remark == ''){
		$('.typetip').html('');
		$('.remarktip').html('备注信息不能为空');
		return ;
	}
	if(money == '' || money<=0){
		$('.typetip').html('');
		$('.remarktip').html('');
		$('.moneytip').html('金额不能为空和负数');
		return ;
	}

	if(type < 0){
		money = money * -1;
	}

	//console.log(year,month,day,remark,money)
	$.ajax({
		type:'post',
		url:'/index/addMoney',
		data:{
			year:year,
			month:month,
			day:day,
			time:time,
			remark:remark,
			money:money,
			userId:userData._id
		},
		success:()=>{
			//console.log('success')
			$('.input_money').removeClass('showInput');
			$('#payorget>.active').removeClass('active');
			$('#remark').val('');
			$('#money').val('');
			$('.typetip').html('');
			$('.remarktip').html('');
			$('.moneytip').html('');
			$('#myModal1').modal('hide')
			findMonthMoney(year,month,userData._id);
		}
	})

})
