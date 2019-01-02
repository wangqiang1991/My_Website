var express = require('express');
var router = express.Router();

//引入dao层
var indexDAO=require("../dao/homeDao.js");

//提交建议
router.get("/contactme",function(req,res){
	var userId = req.query.userId;
	var contact = req.query.contact;
	
	if (!userId || userId == "null") {
		res.send('userId is null');
	} else {
		indexDAO.contactme(userId,contact,function(){
			res.send('success');
		});		
	}

})

//添加记账
router.post("/addMoney",function(req,res){
  var year=req.body.year;
  var month=req.body.month;
  var day = req.body.day;
  var time = req.body.time;
  var remark=req.body.remark;
  var money= Number(req.body.money);
  var userId = req.body.userId;
  indexDAO.insertMoney(year,month,day,time,remark,money,userId,function(data){
    res.send("添加成功");
  });
});

//删除某条账单
router.post("/deleteMoney",function(req,res){
 var id = req.body.id;
 indexDAO.delMoney(id,function(data){
    res.send("添加成功");
  });

})

//查询当月账单
router.get("/findMonthMoney",function(req,res){
	var year = req.query.year;
	var month = req.query.month;
	var userId = req.query.userId;
	var resdata={};
	indexDAO.findYearMoney(year,userId,function(data){
		var yaerMoney = 0;
		var yearPay = 0;
		var yearEarn = 0;
		for(var i = 0;i<data.length;i++){
			yaerMoney += +data[i].money;
			if(+data[i].money > 0){
				yearEarn += +data[i].money;
			}else{
				yearPay += +data[i].money;
			}
		}
		resdata.yaerMoney = yaerMoney;
		resdata.yearPay = yearPay;
		resdata.yearEarn = yearEarn;
		indexDAO.findMonthMoney(year,month,userId,function(data){
			var monthMOney = 0;
			var monthPay = 0;
			var monthEarn = 0;
			for(var i = 0;i<data.length;i++){
				monthMOney += +data[i].money;
				if(+data[i].money > 0){
					monthEarn += +data[i].money;
				}else{
					monthPay += +data[i].money;
				}
			}
			resdata.monthMOney = monthMOney;
			resdata.monthPay = monthPay;
			resdata.monthEarn = monthEarn;
			resdata.moneyData = data;
			res.send(resdata)
	    });
	});

});

//查询某日账单
router.get("/findDayMoney",function(req,res){
	var year = req.query.year;
	var month = req.query.month;
	var day = req.query.day;
	var userId = req.query.userId;
	var resdata={};
	indexDAO.findYearMoney(year,userId,function(data){
		var yaerMoney = 0;
		var yearPay = 0;
		var yearEarn = 0;
		for(var i = 0;i<data.length;i++){
			yaerMoney += +data[i].money;
			if(+data[i].money > 0){
				yearEarn += +data[i].money;
			}else{
				yearPay += +data[i].money;
			}
		}
		resdata.yaerMoney = yaerMoney;
		resdata.yearPay = yearPay;
		resdata.yearEarn = yearEarn;
		indexDAO.findMonthMoney(year,month,userId,function(data){
			var monthMOney = 0;
			var monthPay = 0;
			var monthEarn = 0;
			for(var i = 0;i<data.length;i++){
				monthMOney += +data[i].money;
				if(+data[i].money > 0){
					monthEarn += +data[i].money;
				}else{
					monthPay += +data[i].money;
				}
			}
			resdata.monthMOney = monthMOney;
			resdata.monthPay = monthPay;
			resdata.monthEarn = monthEarn;
			indexDAO.findDayMoney(year,month,day,userId,function(data){
				resdata.moneyData = data;
				res.send(resdata)
			})
	    });
	});

});



module.exports = router;
