var db=require("./database.js");


module.exports.contactme=function(userId,content,func){
   db.collection("contact").insert({userId:userId,content:content},func);
};

module.exports.insertMoney=function(year,month,day,remark,money,userId,func){
   db.collection("account").insert({year:year,month:month,day:day,remark:remark,money:money,userId:userId},func);
};
