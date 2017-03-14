/**
 * Created by a0027 on 2017/3/10.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var schema = new Schema({
    name:String,
    create_time:Date,
    create_user:String,
    principal:String,
    path:String,
    port:String,
    description:String
});

mongoose.model('Project', schema);