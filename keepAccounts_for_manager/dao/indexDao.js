var db=require("./database.js");

//后台登录
module.exports.login=function(option,func){
  db.collection("adminUser").find({},func);
};

//查询用户
module.exports.findUser=function(option,func){
  db.collection("user").find({},func);
};

//查询留言
module.exports.findMessage=function(option,func){
  db.collection("contact").find({},func);
};

//查询年度账单
module.exports.findYearMoney=function(year,userId,func){
  db.collection("account").find({year:year,userId:userId},func);
};

//查询月度账单
module.exports.findMonthMoney=function(year,month,userId,func){
  db.collection("account").find({year:year,month:month,userId:userId},func);
};

//查询单月分页账单
module.exports.findMonthByPage=function(curpage,eachpage,option,func){
  db.collection("account").findByPage(curpage,eachpage,option,func);
};

//删除账单
module.exports.delMoney=function(id,func){
  db.collection("account").remove({_id:db.ObjectID(id)},func);
};
