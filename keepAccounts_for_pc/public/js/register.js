let user = {content:'',sure:false};
let password = {content:'',sure:false};
let comfirmpwd = {sure:false};

//用户名验证
$('#regname').change(function(){
	let name = $('#regname').val();
	if(name == ''){
	 	$('.regname').html('用户名不能为空');
	 	user.sure = false;
	  }else if(/^([a-z]|[0-9]){6,16}$/gi.test(name)){
	 		$.ajax({
	 		type:'get',
	 		url:'/users/validate',
	 		data:{
	 			username:name
	 		},
	 		success:(type)=>{
	 			if(type.status == 0){
	 				$('.regname').html('用户名重复')
	 				user.sure = false;
	 			}else{
	 				$('.regname').html('');
	 				user.sure = true;
	 				user.content = name;
	 			}
	 		}
	 	   })
	}else{
 	 $('.regname').html('用户名格式不正确');
 	 user.sure = false;
	}

});
//密码验证
$('#regpwd').change(function(){
let pwd = $('#regpwd').val();
    if(pwd == ''){
	 	$('.regpwd').html('密码不能为空');
	 	password.sure = false;
	 }else if(/^([a-z]|[0-9]){6,16}$/gi.test(pwd)){
	 	$('.regpwd').html('');
	 	password.sure = true;
	 	password.content = pwd;
	 }else{
	 	$('.regpwd').html('密码格式不正确');
	 	password.sure = false;
	 }
})
//确认密码验证
$('#regcompwd').change(function(){
	let comfirm =  $('#regcompwd').val();
    let pwd = $('#regpwd').val();
	 if(comfirm != pwd){
	 	$('.regcompwd').html('密码不一致');
	 	comfirmpwd.sure = false;
	 }else{
	 	$('.regcompwd').html('');
	 	comfirmpwd.sure = true;
	 }
})


//注册
$('#login_bth').click(function(){
	//console.log(user.sure,password.sure,comfirmpwd.sure)

	 if(user.sure && password.sure && comfirmpwd.sure){
	 	$.ajax({
	 		type:'post',
	 		url:'/users/register',
	 		data:{
	 			username:user.content,
	 			password:password.content
	 		},
	 		success:()=>{
	 			console.log('success');
	 			window.location.href = '/index.html';
	 		}
	 	})
	 }

})
