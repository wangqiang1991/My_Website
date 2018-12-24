import axios from 'axios'
import session from '@/utils/session'

function Request(method, context) {
  this.method = method;
  this.context = context;
  this.requestUrl = "";
  this.requestParams = {};
  this.restParams = {};
  this.requestHeaders = {};
}

Request.prototype.url = function(url) {
  this.requestUrl = url;
  return this;
}

Request.prototype.restful = function(params) {
  this.restParams = params;
  return this;
}

Request.prototype.params = function(params) {
  this.requestParams = params;
  return this;
}

Request.prototype.headers = function(headers) {
  this.requestHeaders = headers;
  return this;
}

Request.prototype.request = function(success, fault) {
  // 替换restful参数
  for (var k in this.restParams) {
    this.requestUrl = this.requestUrl.replace(":" + k, this.restParams[k]);
  }

  console.log(this.method + " " + this.requestUrl);

  if (session.isLogin()) {
    var user = session.getUser();
    this.requestHeaders.access_token = user.accessToken;
  }

  var instance = axios.create({
   baseURL: "",
   timeout: 30000,
   headers: this.requestHeaders,
   params:this.requestParams,
   data:this.requestParams
 });

 if (this.method === "postJson") {
    instance.defaults.params = {};
    instance.defaults.headers["Content-Type"] = "application/json";
    var jsonParams = JSON.stringify(this.requestParams);
    var that = this;
    instance.post(this.requestUrl, jsonParams)
    .then(function (response) {
     success.apply(that.context, [response])
    }).catch(function (error) {
      if (fault) {
        fault.apply(that.context, [error]);
      } else {
        that.context.$message.error(error + "");
      }
    });
    return;
 }

  var that = this;
  instance[this.method](this.requestUrl)
  .then(function (response) {
    success.apply(that.context, [response])
  }).catch(function (error) {
    if (error.response.status == 403) {
      that.context.$message.error("登录已过期，请重新登录");
      window.location.href = "/#/login";
      return;
    }
    if (fault) {
      fault.apply(that.context, [error]);
    } else {
      that.context.$message.error(error + "");
    }

  });

}

export default {
  get:function(context) {
    return new Request("get", context);
  },
  post:function(context) {
    return new Request("post", context);
  },
  postJson:function(context) {
    return new Request("postJson", context);
  },
  put:function(context) {
    return new Request("put", context);
  },
  delete:function(context) {
    return new Request("delete", context);
  }
}
