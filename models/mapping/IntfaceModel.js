/**
 * Created by a0027 on 2017/3/10.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var schema = new Schema({
    project:String,
    modul:String,
    create_time:Date,
    create_user:String,
    path:String,
    full_path:String,
    description:String,
});

mongoose.model('Intface', schema);