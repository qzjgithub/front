/**
 * Created by a0027 on 2017/2/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var schema = new Schema({
    name:String,
    text:String
});

mongoose.model('Role', schema);