<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm"  ref="loginForm" label-position="left">
      <h1 class="title">构巢推广商后台登录</h1>

      <el-form-item prop="username" class="login_userinput">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.loginName" maxlength="20" autoComplete="on" placeholder="推广商帐号" />
      </el-form-item>

      <el-form-item prop="password" class="login_passwordinput">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" maxlength="12" v-model="loginForm.password" autoComplete="on"
          placeholder="推广商密码" />
        <span class='show-pwd' @click='showPwd'>
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>

  </div>
</template>

<script>

import md5 from 'js-md5'
import session from '@/utils/session'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        loginName: '',
        password: ''
      },
      pwdType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    transformRequest:function(data){
      let reslut='';
      reslut = "loginName=" + data.loginName + "&password=" + md5(data.password);
      return reslut;
    },
    handleLogin() {
      if (!this.loginForm.loginName.trim()) {
        this.$message({message: '请输入登录帐号', type: 'warning'});
        return;
      }

      if(this.loginForm.loginName.length < 5 ){
        this.$message({type: 'warning', message: '登录账号字符在5 - 20 个之间' });
        return false;
      }

      if (!this.loginForm.password.trim()) {
        this.$message({message: '请输入登录密码', type: 'warning'});
        return;
      }

      if(this.loginForm.password.length < 6 ){
        this.$message({type: 'warning', message: '登录密码字符在6 - 12 个之间' });
        return false;
      }
      
      this.http.post(this).url(this.config.login).params({
        loginName:this.loginForm.loginName,
        password:md5(this.loginForm.password)
      }).request(function(response) {
        var result = response;
        if(result.data.code != 0){
          this.$message.error(result.data.message);
          return;
        }
        session.saveUser(result.data.data)
        this.loading = false
        window.location.href = "/";
      }, function(error) {
        console.log(error);
         this.$message.error(error);
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .login_userinput,.login_passwordinput{
      .el-form-item__content{
        line-height: 40px;
      }
    }
  }
</style>
