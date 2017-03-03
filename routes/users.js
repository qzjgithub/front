/*
var express = require('express');
var router = express.Router();

/!* GET users listing. *!/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/
/*
 * GET users listing.
 */

var UsersModel = require("./../models").User;
var path = require('path');

exports.list = function (req, res) {
  // res.send("respond with a resource");
  UsersModel.find(function(err,user){
    if (err)
      return res.json({err:err});
    if (user) {
      console.log(user);
      return res.json(user);
    }
  });
};

exports.create = function (req, res) {
  console.log('就是adduser的: '+req.body);
  res.json();
  /*var createUser = new UsersModel(req.body);
  UsersModel.findOne({name:req.body.name}, function (err, user) {
    if (err)
      return res.json({err:err});
    if (user) {
      return res.json({err:"用户名已经存在"});
    }
    createUser.save(function (err, user) {
      if (err) {
        return res.json({err:err});
      }
      req.session["user"] = user;
      res.json();
    });
  });*/
};

exports.login = function (req, res) {
  UsersModel.findOne({name:req.body.name}, function (err, user) {
    if (err)
      return res.json({err:err});
    if (!user) {
      return res.json({err:'用户名不存在'});
    }
    if (!user.authenticate(req.body.password))
      return res.json({err:'密码错误'});
    req.session["user"] = user;
    res.json(user);
  });
};

exports.logout = function (req, res) {
  req.session["user"] = null;
  var html = path.normalize(__dirname + '/../views/index.html');
  res.sendFile(html);
};
