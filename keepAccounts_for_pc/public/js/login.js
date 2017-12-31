//设置cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + decodeURI(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}


//取回cookie
function getCookie(c_name) {
  var c_start = null;
  var c_end = null;
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) {
        return document.cookie.slice(c_start)
      } else {
        return document.cookie.slice(c_start, c_end)
      }
    }
  }
  return ""
}


//记住密码cookie登录
let cook_user = getCookie("user");
let cook_password = getCookie('password');
if(cook_user != '' && cook_password != ''){
	$('#logusername').val(cook_user);
	$('#logpassword').val(cook_password);
}

//登录	
$('#login_bth').click(function(){
	let user = $('#logusername').val();
	let pwd = $('#logpassword').val();
	let remberme = $('#remberme').is(':checked');
	//console.log(remberme,user,pwd)
	if(user == ''){
		$('.messageuser_tip').html('用户名不能为空');
		return false;
	}
	if(pwd == ''){
		$('.messagepwd_tip').html('密码不能为空');
		return false;
	}
	$.ajax({
		type:'post',
		url:'/users/login',
		data:{
			username:user,
			pwd:pwd
		},
		success:(type)=>{
			if(type.status == 1){
				$('.messagepwd_tip').html('用户名或密码不正确');
			}else{
				if(remberme){
					setCookie('user',user,365);
					setCookie('password',pwd,365);
					window.location.href = '/home.html';
				}else{
					window.location.href = '/home.html';
				}
			}
		}
	})


})



