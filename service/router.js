/**
 * Created by admin on 2017/3/22.
 */
var IntdataModel = require("./../models").Intdata;
var IntfaceModel = require("./../models").Intface;
var url = require("url");

function route(req,res,p) {
    var method = req.method;
    var pathname = url.parse(req.url).pathname;
    console.log("About to route a request for " + pathname);
    var text,code = 200;
    IntfaceModel.findOne({project:p._id,type:method,full_path:pathname},null,{lean:true},function(err,intface){
        if(err){
            text = {err:err};
            code = 400;
            back(text,code,res);
        }else if(intface){
            console.log(intface._id);
            IntdataModel.findOne({intface:intface._id,code:200},function(err,intdata){
                if (err){
                    text = {err:err};
                    code = 400;
                    back(text,code,res);
                }else if (intdata) {
                    console.log(intdata.type);
                    switch(intdata.type){
                        case 'text':
                            text = {msg:intdata.text};
                            break;
                        case 'file':
                            text = {msg:intdata.file};
                            break;
                        case 'table':
                            text = {msg:'待实现!'};
                            break;
                        default:
                            text = {msg:'no data'};
                    }
                    code = intdata.code;
                    console.log(code);
                    back(text,code,res);
                }else{
                    text = {err:"无此数据"};
                    code = 400;
                    back(text,code,res);
                }
            });
        }else{
            text = {err:"无此接口"};
            code = 400;
            back(text,code,res);
        }
    });
}

function back(text,code,res){
    console.log(code);
    res.writeHead(code, {"Content-Type": "application/json;charset=UTF-8"});
    res.write(JSON.stringify(text),'utf8');
    res.end();
}

exports.route = route;