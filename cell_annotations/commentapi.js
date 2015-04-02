define(['custom/authorization'], function(authorization) {

    "use strict";

    var save_comment = function(cell, username, comment) {
        var item = {"username": username, "comment": comment, "date": Date()};
        if (cell.metadata['comments'] == undefined) {
            cell.metadata['comments'] = [item];
        } else {
            cell.metadata['comments'].push(item);
        }
        IPython.notebook.save_checkpoint();
        console.log("comment saved");
        return item;
    }

    var get_all_comments = function(cell) {
        if (cell != null) {
            return cell.metadata.comments;
        } else {
            throw "Invalid cell";
        }
    }

    var commentapi = {
        save_comment : save_comment,
        get_all_comments : get_all_comments,
    };

    return commentapi;
});
