define(function() {

    "use strict";

    var get_username = function() {
        var cookie = undefined;
        try {
            cookie = _get_cookie();
        }
        catch (err) {
            authorize();
            cookie = _get_cookie();
        }
        return cookie['username'];
    };

    var authorize = function() {
        IPython.keyboard_manager.edit_mode();
        var error_div = $('<div/>').css('color', 'red');
        var message = "Create your username";

        var input_form = $('<input id="username_field">');

        var dialogform = $('<div/>').attr('title', 'Edit the metadata')
            .append(
                $('<form/>').append(
                    $('<fieldset/>').append(
                        $('<label/>')
                        .attr('for','metadata')
                        .text(message)
                        )
                        .append(error_div)
                        .append($('<br/>'))
                        .append(input_form)
                    )
            );

        var modal_obj = IPython.dialog.modal({
            title: "Authorization",
            body: dialogform,
            buttons: {
                OK: { class : "btn-primary",
                    click: function() {
                        try {
                            var username = $("#username_field").val();
                            _set_cookie(username);
                        } catch(e) {
                            error_div.text(e.message);
                            return false;
                        }
                    }
                }
            },
        });
    }

    var _get_cookie = function() {
        var cookie = JSON.parse(document.cookie);
        if (cookie['username'] == undefined) {
            throw Error("Invalid cookie");
        }
        return cookie;
    }

    var _set_cookie = function(username) {
        var cookie = {};
        _check_username(username);
        cookie['username'] = username;
        cookie['registration_date'] = Date();
        document.cookie = JSON.stringify(cookie);
        IPython.notebook.save_checkpoint();
    }

    var _check_username = function(username) {
        if (username.length <= 1) {
            throw new Error("Username is too short");
        }
        if (IPython.notebook.metadata['users'] == undefined) {
            IPython.notebook.metadata['users'] = [username];
        } else {
            var userList = IPython.notebook.metadata['users'];
            for (var i in userList) {
                if (username == userList[i]) {
                    throw new Error("Username is already taken");
                    break;
                }
            }
            IPython.notebook.metadata['users'].push(username);
        }
    }

    var authorization = {
        authorize : authorize,
        get_username : get_username,
    };

    return authorization;
});
