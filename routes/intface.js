var express = require('express');
var router = express.Router();

var IntfaceModel = require("./../models").Intface;

router.param('id',function(req,res,next,id){
    next();
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id,
        arr = id.split('='),
        option = {};
    option[arr[0]] = arr[1];
    IntfaceModel.find(option,function(err,intface){
        if (err){
            res.json({err:err});
        }else if (intface) {
            res.json(intface);
        }
    });
    // next();
});

router.post('/', function (req, res) {
    var u = req.body;
    delete u._id;
    var createIntface = new IntfaceModel(req.body);
    IntfaceModel.findOne({path:u.path,project:u.project,modul:u.modul}, function (err, intface) {
        if (err){
            res.json({err:err});
        } else if (intface) {
            res.json({err:"请求路径已存在！"});
        }else{
            createIntface.save(function (err, intface) {
                if (err) {
                    res.json({err:err});
                }
                res.json(intface);
            });
        }
    });
});

router.put('/', function (req, res) {
    var u = req.body;
    var updateIntface = new IntfaceModel(req.body);
    var options    = {upsert : true};
    IntfaceModel.update({_id:updateIntface._id},updateIntface,options , function (err, intface) {
        if (err){
            res.json({err:err});
        } else if (intface) {
            res.json(intface);
        }else{
            res.json({err:"不存在此用户！"});
        }
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    IntfaceModel.remove({_id:id},function(err,intface){
        if (err){
            res.json({err:err});
        } else if (intface) {
            res.json({msg:"删除成功！"});
        }
    });
});

module.exports = router;

