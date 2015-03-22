var getAllComments = (function(cell) {

        if (cell != null) {
            return cell.metadata.comments;
        } else {
            throw "getAllComments: Invalid cell!"
        }
    }
);
