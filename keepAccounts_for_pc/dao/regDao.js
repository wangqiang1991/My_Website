var db=require("./database.js");


module.exports.findByUsername=function(username,func){
  db.collection("user").find({username:username},func);
};


module.exports.insertName=function(username,pwd,func){
   db.collection("user").insert({username:username,pwd:pwd},func);
};


module.exports.loginName=function(username,pwd,func){
    db.collection("user").find({username:username,pwd:pwd},func);
};
