var annotation_extension = (function() {

    executed = false;

    saveComment = (function(id, cell) {
            comment = document.getElementById("textBox" + id).value;
            if (cell.metadata['comments'] == undefined) {
                cell.metadata['comments'] = [comment];

            }
            else
            {
                cell.metadata['comments'].push(comment);
            }

            var para = document.createElement("p");
            var node = document.createTextNode(comment);
            var prompt = document.createTextNode('> ');
            para.appendChild(prompt);
            para.appendChild(node);
            ourCommentBox = document.getElementById("oldCommentsBox" + id);
            ourCommentBox.appendChild(para);
            console.log("saving completed!");
        }
    )

    toggleLog = (function(id) {
        $("#oldCommentsBox" + id).toggle();
        }
    )

    showAnnotationPanel = function () {
        if (!executed) {

            var cells = IPython.notebook.get_cells();

            for (var id = 0; id < cells.length; id++) {
                target_cell = cells[id];
                
                var textBox = document.createElement('textarea');
                textBox.id = "textBox" + id;
                console.log(textBox.name);
                textBox.placeholder = "comment here";
                textBox.style.width = "330px";
                textBox.style.heigth = "200px";

                var saveButton = document.createElement('input');
                saveButton.type = "button";
                saveButton.value = "save";
                saveButton.style.height = "40px";
                saveButton.style.width = "80px";
                
                saveButton.addEventListener('click', (function(id, target_cell) {
                    return function(){
                        saveComment(id, target_cell);
                    };
                })(id, target_cell)
                );

                oldCommentsBox = document.createElement('div');
                oldCommentsBox.id = "oldCommentsBox" + id;
                oldCommentsBox.style.backgroundColor = "#E6E6E6";
                oldCommentsBox.style.padding = "20px";
                oldCommentsBox.textAlign = "left";
                oldCommentsBox.style.height = "auto";
                oldCommentsBox.style.width = "300px";

                toggleButton = document.createElement('input');
                toggleButton.type = "button";
                toggleButton.style.height = "40px";
                toggleButton.style.width = "80px";
                toggleButton.value = "show/hide";
                toggleButton.id = "toggleButton" + id;
                toggleButton.addEventListener('click', (function(id) {
                    return function(){
                        toggleLog(id);
                    };
                })(id)
                );

                annotationPanel = document.createElement('table');
                annotationPanel.id = "annotationPanel" + id;
                annotationPanel.style.height = "auto";
                annotationPanel.style.width = "auto";
                annotationPanel.style.align = "center";

                row1 = annotationPanel.insertRow(0);
                row2 = annotationPanel.insertRow(1);
                row3 = annotationPanel.insertRow(2);
                row4 = annotationPanel.insertRow(3);


                text_box = row1.insertCell(0);
                text_box.style.padding = "15px";
                text_box.style.margin = "20px 10px 10px 20px";
                text_box.appendChild(textBox);

                save_button = row2.insertCell(0);
                save_button.appendChild(saveButton);
                save_button.style.padding = "15px";

                toggle_button = row3.insertCell(0);
                toggle_button.appendChild(toggleButton);
                toggle_button.style.padding = "15px";
                
                comments_log = row4.insertCell(0);
                comments_log.appendChild(oldCommentsBox);
                comments_log.style.padding = "15px";
                comments_log.style.margin = "20px 10px 10px 20px";

                $('.cell:nth('+id+')').append(annotationPanel);

                if (cells[id].metadata.comments != undefined)
                {
                    var archivedComments = cells[id].metadata.comments;
                    for (var j in archivedComments)
                    {
                        var para = document.createElement("p");
                        var prompt = document.createTextNode('> ');
                        var node = document.createTextNode(archivedComments[j]);
                        para.appendChild(prompt);
                        para.appendChild(node);
                        oldCommentsBox.appendChild(para);
                    }
                }
            }

            executed = true;
        }
        else 
        {
            console.log("Double envoke!");
        }
    };

    IPython.toolbar.add_buttons_group([
        {
            id : "annotation_panel",
            label : "show annotation boxes",
            icon : "icon-comment",
            callback: showAnnotationPanel
        }
    ]);
})();