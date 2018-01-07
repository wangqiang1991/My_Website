var db=require("./database.js");

//用户评论
module.exports.contactme=function(userId,content,func){
   db.collection("contact").insert({userId:userId,content:content},func);
};

//增加金额
module.exports.insertMoney=function(year,month,day,time,remark,money,userId,func){
   db.collection("account").insert({year:year,month:month,day:day,time:time,remark:remark,money:money,userId:userId},func);
};

//查询年度账单
module.exports.findYearMoney=function(year,userId,func){
   db.collection("account").find({year:year,userId:userId},func);
};

//查询单月账单
module.exports.findMonthMoney=function(year,month,userId,func){
   db.collection("account").find({year:year,month:month,userId:userId},func);
};

//查询某日的账单
module.exports.findDayMoney=function(year,month,day,userId,func){
   db.collection("account").find({year:year,month:month,day:day,userId:userId},func);
};

//删除账单
module.exports.delMoney=function(id,func){
   db.collection("account").remove({_id:db.ObjectID(id)},func);
};
