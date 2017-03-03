/**
 * Created by a0027 on 2017/2/9.
 */
var index = require('./index');
var user = require('./users');
var role = require('./role');
// var blog = require('./blog');
module.exports = function (app) {
    app.get('/', index.index);
    //user
    app.get('/user', user.list);
    //role
    app.get('/role',role.list);
};