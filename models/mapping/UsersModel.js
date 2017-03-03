/**
 * Created by a0027 on 2017/2/9.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var schema = new Schema({
    name:String,
    password:String,
    create_time:Date,
    create_user:String,
    role:String,
    description:String
});
/*schema.virtual("password").set(function (password) {
    this.hash_password = encryptPassword(password);
});

schema.method("authenticate", function (plainText) {
    return encryptPassword(plainText) === this.hash_password;
});

function encryptPassword(password) {
    return crypto.createHash("md5").update(password).digest("base64");
}*/

mongoose.model('Users', schema);