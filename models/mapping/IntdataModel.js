/**
 * Created by admin on 2017/3/21.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var schema = new Schema({
    intface:String,
    create_time:Date,
    create_user:String,
    status:String,
    code:Number,
    type:String,
    table:String,
    text:String,
    file:String,
    operate:String,
    description:String,
});

mongoose.model('Intdata', schema);