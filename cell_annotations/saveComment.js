var saveComment = (function(cell, comment) {

        console.log("start saving");
        var cookies = undefined;

        try {
            cookies = JSON.parse(document.cookie);
            if (cookies['username'] == undefined) {
                throw "Invalid cookie";
            }
        }
        catch(err) {
            cookies = {};

            if(IPython.notebook.metadata['users'] == undefined) {
                cookies['username'] = window.prompt("Enter your name:");
                IPython.notebook.metadata['users'] = [cookies['username']];
            } else {

                var username = undefined;
                var userAlreadyExisted = true;

                while (userAlreadyExisted) {
                    username = window.prompt("Enter your name:");
                    var userList = IPython.notebook.metadata['users'];

                    userAlreadyExisted = false;
                    for (var i in userList) {
                        if (username == userList[i]) {
                            userAlreadyExisted = true;
                            window.alert("This username busy. Try another");
                            break;
                        }
                    }
                }
                cookies['username'] = username;
                cookies['registration_date'] = Date();
                document.cookie = JSON.stringify(cookies);
                IPython.notebook.metadata['users'].push(username);
            }
        }

        var username = cookies['username'];
        var item = {"username":username, "comment":comment, "date":Date()};

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