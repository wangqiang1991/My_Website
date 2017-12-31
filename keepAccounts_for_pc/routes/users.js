var express = require('express');
var router = express.Router();

//引入dao层
var RegDAO=require("../dao/regDao.js");


//获取session的数据
router.get("/getSession",function(req,res){
  var name=req.session.name;
     if(name){
       res.send(name);
     }
     else{
       res.send({});
     }
});

//注销
router.get("/logout",function(req,res){
  req.session.name=null;
  res.send("注销");
});


//重命名
router.get("/validate",function(req, res){
  var username=req.query.username;
  RegDAO.findByUsername(username,function(data){
    if(data.length>0){
      res.send( {status:0 } );
    }
    else{
      res.send( { status:1 } );
    }

  });

});


//注册
router.post("/register",function(req,res){

  var username=req.body.username;
  var pwd=req.body.password;
  RegDAO.insertName(username,pwd,function(data){
    res.send("注册成功");
  });


});



//登陆
router.post("/login",function(req,res){

  var username=req.body.username;
  var pwd=req.body.pwd;

  RegDAO.loginName(username,pwd,function(data){
    if(data.length>0 ){
      req.session.name=data[0];
      res.send({status:0 });
    }else{
      res.send({ status:1 });
    }

});

})


module.exports = router;
