var express = require('express');
var router = express.Router();

var RoleModel = require("./../models").Role;

/* GET users listing. */
router.get('/', function(req, res, next) {
    RoleModel.find(function(err,role){
        if (err){
            res.json({err:err});
        }else if (role) {
            res.json(role);
        }
    });
    // next();
});

module.exports = router;

