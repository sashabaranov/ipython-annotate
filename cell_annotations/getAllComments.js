var getAllComments = (function(cellIndex) {

        var cell = IPython.notebook.get_cell(cellIndex);\

        if (cell != null) {
            return cell.metadata.comments;
        } else {
            throw "getAllComments: Invalid cell index!"
        }
    }
);