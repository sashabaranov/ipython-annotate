var saveCommentJupyterHub = (function(cellIndex, comment) {

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

        var users = IPython.notebook.metadata.users;
        if (users == undefined) {
            users[username] = {};
        }
        users[username] = true;

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