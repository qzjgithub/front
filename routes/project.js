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

router.put('/start',function(req,res){
    var p = req.body;
    console.log(p);
    var http = require('http');

    http.createServer(function (request, response) {

        // 发送 HTTP 头部
        // HTTP 状态值: 200 : OK
        // 内容类型: text/plain
        response.writeHead(200, {'Content-Type': 'text/plain'});

        // 发送响应数据 "Hello World"
        response.end('Hello World\n');
    }).listen(p.port);

    res.send({'msg':'aaa'});
});
module.exports = router;