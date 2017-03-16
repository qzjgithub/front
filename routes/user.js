var express = require('express');
var router = express.Router();

var UsersModel = require("./../models").User;

router.param('id',function(req,res,next,id){
  next();
});

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
  var u = req.body;
  delete u._id;
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
         res.json(user);
       });
     }
   });
});

router.put('/', function (req, res) {
    var u = req.body;
    var updateUser = new UsersModel(req.body);
    var options    = {upsert : true};
    UsersModel.update({_id:updateUser._id},updateUser,options , function (err, user) {
        if (err){
          res.json({err:err});
        } else if (user) {
          res.json(user);
        }else{
          res.json({err:"不存在此用户！"});
        }
    });
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  var id = req.params.id;
  UsersModel.remove({_id:id},function(err,user){
    if (err){
      res.json({err:err});
    } else if (user) {
      res.json({msg:"删除成功！"});
    }
  });
});

module.exports = router;
