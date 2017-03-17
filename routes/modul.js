var express = require('express');
var router = express.Router();

var ModulModel = require("./../models").Modul;


router.param('id',function(req,res,next,id){
    next();
});

router.post('/', function (req, res) {
    var u = req.body;
    delete u._id;
    var createModul = new ModulModel(req.body);
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
    var id = req.params.id;
    ModulModel.find({project:id},function(err,modul){
        if (err){
            res.json({err:err});
        }else if (modul) {
            res.json(modul);
        }
    });
    // next();
});

module.exports = router;

