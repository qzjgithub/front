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
                }
                res.json(project);
            });
        }
    });
});
module.exports = router;