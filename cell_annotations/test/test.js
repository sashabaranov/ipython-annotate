var testFunction = (function() {

    var saveCommentJupyterHub = (function(cellIndex, comment) {

            console.log("start saving");
            var cookie = document.cookie;
            var cookie_length = cookie.length;

            var APPENDIX = "jupyter-hub-token-";

            var username = "";
            var start_index = APPENDIX.length;

            for (var i = start_index; i < cookie_length; i++) {
                if (cookie[i] != '=') {
                    username += cookie[i];
                } else {
                    break;
                }
            }
            console.log("username: ", username);

            var users = IPython.notebook.metadata.users;
            if (users == undefined) {
                users[username] = {};
            }
            users[username] = true;

            console.log(users);

            var item = {"username":username, "comment":comment, "date":Date()};
            cell = IPython.notebook.get_cell(cellIndex);

            if (cell.metadata['comments'] == undefined) {
                cell.metadata['comments'] = [item];
            } else {
                cell.metadata['comments'].push(item);
            }

            // Saves current session in IPython. 
            // So if we reload our page without pressing save button we will not lose our comment.
            IPython.notebook.save_checkpoint();
            console.log("comment saved");
        }
    );

    var getAllComments = (function(cellIndex) {
            var cell = IPython.notebook.get_cell(cellIndex);
            if (cell != null) {
                return cell.metadata.comments;
            } else {
                throw "getAllComments: Invalid cell index!"
            }
        }
    );

    saveCommentJupyterHub(0, "hi!");
    console.log(getAllComments(0));

})();