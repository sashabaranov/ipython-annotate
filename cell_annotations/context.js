var context_menu = (function() {

    if (document.addEventListener) {
        document.addEventListener('contextmenu', function(e) {

            var selected_cell = IPython.notebook.get_selected_cell();

            if (selected_cell.metadata.comments != undefined) {
                var comments_log = "";
                var cookies_to_comments = selected_cell.metadata.comments;

                for (var cookie in cookies_to_comments) {
                    console.log(cookie);
                    var user_comments = cookies_to_comments[cookie];
                    for (var i in user_comments) {
                        comments_log += cookie + ': ' + user_comments[i] + '\n';
                    }
                }
            }

            else {
                comments_log = "No comments!";
            }

            var comment = prompt("Previous comments are:\n\n" + comments_log);

            var cookies = document.cookie;

            if (selected_cell.metadata['comments'] == undefined) {
                selected_cell.metadata.comments = {};
            }

            if(selected_cell.metadata.comments[cookies] == undefined) {
                selected_cell.metadata.comments[cookies] = [comment];
            }
            else {
                selected_cell.metadata.comments[cookies].push(comment);
            }

            IPython.notebook.save_checkpoint();
            console.log("saving completed!");

            e.preventDefault();
        }, false);
    }

    else {
        document.attachEvent('oncontextmenu', function() {
            prompt("You've tried!");
            window.event.returnValue = false;
        });
    }
})();
