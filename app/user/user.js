"use strict";
/**
 * Created by a0027 on 2017/3/2.
 */
var User = (function () {
    function User(_id, name, password, create_time, create_user, role, description) {
        this._id = _id;
        this.name = name;
        this.password = password;
        this.create_time = create_time;
        this.create_user = create_user;
        this.role = role;
        this.description = description;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map