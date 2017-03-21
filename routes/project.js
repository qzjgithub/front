/**
 * Created by a0027 on 2017/3/10.
 */
var express = require('express');
var router = express.Router();

var ProjectsModel = require("./../models").Project;

router.get('/', function(req, res, next){
    ProjectsModel.find(function(err,project){
        if(err){
            res.json({err:err});
        }else if(project){
            res.json(project);
        }
    });
});

router.get('/:id',function(req, res, next){
    var id = req.params.id;
    ProjectsModel.findOne({_id:id},function(err,project){
        if(err){
            res.json({err:err});
        }else if(project){
            res.json(project);
        }
    })
});

router.post('/', function (req, res) {
    var u = req.body;
    delete u._id;
    var createProject = new ProjectsModel(req.body);
    ProjectsModel.findOne({name:req.body.name}, function (err, project) {
        if (err){
            res.json({err:err});
        } else if (project) {
            res.json({err:"项目名称已经存在"});
        }else{
            createProject.save(function (err, project) {
                if (err) {
                    res.json({err:err});
                }else{
                    res.json(project);
                }
            });
        }
    });
});

router.put('/', function (req, res) {
    var u = req.body;
    var updateProject = new ProjectsModel(req.body);
    var options    = {upsert : true};
    ProjectsModel.update({_id:updateProject._id},updateProject,options , function (err, project) {
        if (err){
            res.json({err:err});
        } else if (project) {
            res.json(project);
        }else{
            res.json({err:"不存在此用户！"});
        }
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    ProjectsModel.remove({_id:id},function(err,project){
        if (err){
            res.json({err:err});
        } else if (project) {
            res.json({msg:"删除成功！"});
        }
    });
});
module.exports = router;