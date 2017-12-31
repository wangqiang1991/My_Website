var express = require('express');
var router = express.Router();

//引入dao层
var indexDAO=require("../dao/indexDAO.js");

//提交建议
router.get("/contactme",function(req,res){
	var userId = req.query.userId;
	var contact = req.query.contact;
	indexDAO.contactme(userId,contact,function(){
		res.send('success')
	});
})

//添加记账
router.post("/addMoney",function(req,res){
  var year=req.body.year;
  var month=req.body.month;
  var day = req.body.day
  var remark=req.body.remark;
  var money=req.body.money;
  var userId = req.body.userId;
  indexDAO.insertMoney(year,month,day,remark,money,userId,function(data){
    res.send("添加成功");
  });
});



module.exports = router;
