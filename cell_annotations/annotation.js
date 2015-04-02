require([
    'custom/commentapi', 
    'custom/authorization'
], function (commentapi, authorization) {

    "use strict";

    var flag_name = 'comment';
    var counter = 0; 

    function generate_id() {
        return 'comment_dialog_' + counter++;
    };

    function new_comment_element(cell) {
        var comment_id = generate_id();
        cell.comment_id = comment_id;
        var $dialog = $('<div/>', {id: comment_id, title: 'Comment'});
        var $comment_box = $('<div/>', {class: 'comment_box'});
        var $textarea = $('<textarea/>', {type: 'text', placeholder: 'add comment', class: 'edited_comment'});
        var $button = $('<button/>', {class: 'send_comment', html: 'Send'});
        append_old_comments(cell, $comment_box);
        $textarea.appendTo($comment_box);
        $comment_box.appendTo($dialog);
        $button.appendTo($dialog);
        return $dialog;
    }

    function append_old_comments(cell, $comment_box) {
        var old_comments = commentapi.get_all_comments(cell);
        if (!old_comments)
            return;
        for (var i = 0; i < old_comments.length; ++i) {
            var comment = old_comments[i];
            var text = comment.comment;
            var $comment = $('<p/>', {html: text});
            $comment_box.append($comment);
        }
    }

    function new_comment_qtip_options(cell, $dialog) {
        return {
            content: {
                text: $dialog,
                title: 'Comment',
                button: 'Close'
            },
            style: {
                classes: 'qtip-bootstrap'
            },
            hide: false,
            position: {
                my: 'center right',
                at: 'center right',
                target: cell.element,
                adjust: {
                    mouse: false
                }

            },
            show: {
                ready: true,
                event: false
            }
        };
    }

    function add_new_comment_events(cell) {
        IPython.keyboard_manager.edit_mode();
        $('body').on('click', '#' + cell.comment_id + ' .send_comment', function () {
            print_last_comment(cell);
        });

    }

    function send_comment_dialog(cell) {
        var $dialog = new_comment_element(cell);
        cell.element.qtip(new_comment_qtip_options(cell, $dialog));
        add_new_comment_events(cell);
    }


    function print_last_comment(cell) {
        var $last_comment = $('#' + cell.comment_id + ' .edited_comment');
        var text = $last_comment.val();
        commentapi.save_comment(cell, username, text);
        var $saved_comment = $('<p/>', {html: text});
        $last_comment.before($saved_comment);
        $last_comment.val("");
    };


    function show_comment_dialog(cell) {
        if (cell.comment_id == undefined) {
            send_comment_dialog(cell);
        } else {
            cell.element.qtip("show");
        }

    };

    function hide_comment_dialog(cell) {
        if (cell.comment_id != undefined) {
            cell.element.qtip("hide");
        }

    };

    var cell_flag_init = IPython.CellToolbar.utils.checkbox_ui_generator(
        flag_name,
        function (cell, value) {
            cell.metadata[flag_name] = value;
            if (value) {
                show_comment_dialog(cell);
            } else {
                hide_comment_dialog(cell);
            }
        },
        function (cell) {
            return false;
        }
    );

    IPython.CellToolbar.register_callback(flag_name, cell_flag_init);
    IPython.CellToolbar.register_preset('Export Comments', [flag_name]);
    var username = authorization.get_username();
});
