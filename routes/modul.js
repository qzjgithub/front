var express = require('express');
var router = express.Router();

var ModulModel = require("./../models").Modul;


router.param('id',function(req,res,next,id){
    next();
});

router.post('/', function (req, res) {
    var u = req.body;
    delete u._id;
    var createModul = new ModulModel(u);
    ModulModel.findOne({name:u.name,project:u.project}, function (err, modul) {
        if (err){
            res.json({err:err});
        } else if (modul) {
            res.json({err:"模块名称已经存在"});
        }else{
            createModul.save(function (err, modul) {
                if (err) {
                    res.json({err:err});
                }
                res.json(modul);
            });
        }
    });
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id,
        arr = id.split('='),
        option = {};
    console.log(id);
    console.log(arr);
    option[arr.length>1?'project':'_id'] = arr[arr.length-1];
    console.log(option);
    ModulModel.find(option,function(err,modul){
        if (err){
            res.json({err:err});
        }else if (modul) {
            res.json(modul);
        }
    });
    // next();
});

router.put('/', function (req, res) {
    var u = req.body;
    var updateModul = new ModulModel(req.body);
    var options    = {upsert : true};
    ModulModel.update({_id:updateModul._id},updateModul,options , function (err, modul) {
        if (err){
            res.json({err:err});
        } else if (modul) {
            res.json(modul);
        }else{
            res.json({err:"不存在此模块！"});
        }
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    ModulModel.remove({_id:id},function(err,modul){
        if (err){
            res.json({err:err});
        } else if (modul) {
            res.json({msg:"删除成功！"});
        }
    });
});

module.exports = router;

