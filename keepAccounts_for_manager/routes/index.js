var express = require('express');
var router = express.Router();
//引入dao层
var indexDAO=require("../dao/indexDao.js");

/*查询用户留言*/
router.get('/leaveMessage', function(req, res, next) {

  indexDAO.findMessage({},function(data){

    new Promise(function(resolve, reject){
      var resultdata = data;
      indexDAO.findUser({},function(userData){

        for (var i = 0; i < resultdata.length; i++) {
          for (var j = 0; j < userData.length; j++) {
            if(userData[j]._id == resultdata[i].userId) {
              resultdata[i].userName = userData[j].username;
              break ;
            }
           } 
        }
        resolve(resultdata)
      })  
    }).then(function(data){
      res.send(data)  
    })

  });

});

//登录
router.post("/login",function(req,res){
  var user = req.query.user;
  var passWord = req.query.passWord;

  indexDAO.login({},function(data){
    var resultdata = data[0];
    if (user == resultdata.user && passWord == resultdata.passWord) {
      var obj = {};
      obj.code = 0;
      obj.data = resultdata;
      res.send(obj);
    } else {
      var errorObj = {};
      errorObj.code = 1;
      errorObj.data = null;
      errorObj.message = '用户名或密码错误';
      res.send(errorObj);
    }
  });

});

/*查询用户列表*/
router.get('/findByUser', function(req, res, next) {

  indexDAO.findUser({},function(data){
    res.send(data)
  });

});

/*查询年消费明细*/
router.get('/findYearAccount',function(req, res) {
  var userId = req.query.userId;
  var year = req.query.year;

  indexDAO.findYearMoney(year,userId,function(data) {
    res.send(data)
  })

});

/*查询月消费明细*/
router.get('/findMonthAccount',function(req, res) {
  var pageIndex = +req.query.pageIndex;
  var pageSize = +req.query.pageSize;
  var userId = req.query.userId;
  var year = req.query.year;
  var month = req.query.month;

  var option = {};
  option.year = year;
  option.month = month;
  option.userId = userId;

  indexDAO.findMonthByPage(pageIndex,pageSize,option,function(data) {

    indexDAO.findMonthMoney(year,month,userId,function(monthData) {
      var allPay = 0;
      var allEarn = 0;

      for (var i = 0; i < monthData.length; i++) {
        var money = +monthData[i].money;
        if (money > 0) {
          allEarn += money;
        } else {
          allPay += money;
        }
      }

      var monthMoney = {};
      monthMoney.allEarn = allEarn;
      monthMoney.allPay = allPay;
      data.monthMoney = monthMoney;
      res.send(data)

    })

  })

});


/*删除订单明细*/
router.post('/deteleAccount', function(req, res, next) {
  var accountId = req.query.accountId; 

  indexDAO.delMoney(accountId,function(data){
    res.send('success')
  });

});


module.exports = router;
