//展示金额录入框
$('#showInput').click(()=>{
	var date = new Date();
	$('#time').html('当前时间:'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())
	$('.input_money').addClass('showInput');
})
//关闭金额录入框
$('#cancel_btn').click(()=>{
	$('.input_money').removeClass('showInput')
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


//获取session里面的数据
let url = window.location.href;
let session_user =  url.slice(url.lastIndexOf('/')+1,url.lastIndexOf('.'))
let userData = null;
if(session_user == 'home' || session_user == 'contact'){
	$.ajax({
	type:'get',
	url:'/users/getSession',
	success:(data)=>{
		console.log(data._id)
		if(data._id == undefined){
			window.location.href = '/index.html';
		}else{
			userData = data;
			findMoney(year,month,'',data._id);
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


//金额查询
function findMoney(year,month,day,userId){
	$.ajax({
		type:'get',
		url:'/index/findMoney',
		data:{
			year:year,
			month:month,
			day:day,
			userId:userId
		},
		success:(data)=>{
			console.log(data)
		}
	})
}



//金额添加事件
$('#addmoney_btn').click(()=>{
	let type = $('#payorget>.active>input').val();
	let remark = $('#remark').val();
	let money = +$('#money').val();
	//console.log(money)
	if(remark == ''){
		$('.remarktip').html('备注信息不能为空');
		return ;
	}
	if(money == '' || money<=0){
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
			remark:remark,
			money:money,
			userId:userData._id
		},
		success:()=>{
			//console.log('success')
			$('.input_money').removeClass('showInput');
		}
	})

})
