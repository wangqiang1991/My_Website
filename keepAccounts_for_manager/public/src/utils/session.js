export default {
  saveUser:function(user) {
    // 保存用户登陆信息
    console.log("save user", user);
    this.put("user", JSON.stringify(user));
  },
  isLogin:function() {
    // 判断是否登陆
    return this.has("user");
  },
  getUser:function() {
    // 获取用户登陆信息
    if (!this.isLogin()) {
      return null;
    }
    var userJson = this.get("user");
    return JSON.parse(userJson);
  },
  clearUser:function() {
    // 清除用户登陆信息
    if (this.isLogin()) {
      this.remove("user");
    }
  },
  put:function(key, value) {
    sessionStorage.setItem(key, value);
  },
  has:function(key) {
    return sessionStorage.hasOwnProperty(key);
  },
  get:function(key) {
    if (this.has(key)) {
      return sessionStorage[key];
    }
    return null;
  },
  remove:function(key) {
    if (this.has(key)) {
      sessionStorage.removeItem(key);
    }
  }
}
