"use strict";
var Project = (function () {
    function Project(_id, name, create_time, create_user, principal, path, port, description) {
        this._id = _id;
        this.name = name;
        this.create_time = create_time;
        this.create_user = create_user;
        this.principal = principal;
        this.path = path;
        this.port = port;
        this.description = description;
    }
    return Project;
}());
exports.Project = Project;
//# sourceMappingURL=project.js.map