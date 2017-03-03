/**
 * Created by a0027 on 2017/2/16.
 */
var RoleModel = require("./../models").Role;

exports.list = function (req, res) {
    RoleModel.find(function(err,role){
        if (err)
            return res.json({err:err});
        if (role) {
            return res.json(role);
        }
    });
};
