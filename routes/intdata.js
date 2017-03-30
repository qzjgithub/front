/**
 * Created by admin on 2017/3/21.
 */
var express = require('express');
var router = express.Router();

var IntdataModel = require("./../models").Intdata;

router.param('id',function(req,res,next,id){
    next();
});
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    IntdataModel.find({intface:id},function(err,intdata){
        if (err){
            res.json({err:err});
        }else if (intdata) {
            res.json(intdata);
        }
    });
    // next();
});

router.post('/', function (req, res) {
    var u = req.body;
    delete u._id;
    var createIntdata = new IntdataModel(u);
    IntdataModel.findOne({intface:u._id,code:u.code}, function (err, intdata) {
        if (err){
            res.json({err:err});
        } else if (intdata) {
            res.json({err:"此错误码数据已存在！"});
        }else{
            createIntdata.save(function (err, intdata) {
                if (err) {
                    res.json({err:err});
                }
                res.json(intdata);
            });
        }
    });
});

router.put('/', function (req, res) {
    var u = req.body;
    var updateIntdata = new IntdataModel(req.body);
    var options    = {upsert : true};
    IntdataModel.update({_id:updateIntdata._id},updateIntdata,options , function (err, intdata) {
        if (err){
            res.json({err:err});
        } else if (intdata) {
            res.json(intdata);
        }else{
            res.json({err:"不存在此用户！"});
        }
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    IntdataModel.remove({_id:id},function(err,intdata){
        if (err){
            res.json({err:err});
        } else if (intdata) {
            res.json({msg:"删除成功！"});
        }
    });
});

module.exports = router;

