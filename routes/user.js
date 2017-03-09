var express = require('express');
var router = express.Router();

var UsersModel = require("./../models").User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  UsersModel.find(function(err,user){
    if (err){
      res.json({err:err});
    }else if (user) {
      res.json(user);
    }
  });
  // next();
});

router.post('/', function (req, res) {
  console.log('就是adduser的: '+JSON.stringify(req.body));
  var u = req.body;
  delete u._id;
  console.log(typeof u.create_time);
  // u.create_time = new Date(u.create_time);
  var createUser = new UsersModel(req.body);
   UsersModel.findOne({name:req.body.name}, function (err, user) {
     if (err){
       res.json({err:err});
     } else if (user) {
       res.json({err:"用户名已经存在"});
     }else{
       createUser.save(function (err, user) {
         if (err) {
           res.json({err:err});
         }
         console.log(req.session);
         // req.session["user"] = user;
         res.json(user);
       });
     }
   });
});

module.exports = router;
