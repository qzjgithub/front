var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  next();
});

router.post('/', function (req, res) {
  console.log('就是adduser的: '+JSON.stringify(req.body));
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
});

module.exports = router;
