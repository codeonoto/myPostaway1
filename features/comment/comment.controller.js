import ApplicationError from "../../errorHandler/application.error.js";
import CommentModel from "./comment.model.js";
const commentModel = new CommentModel();
export default class CommentController {
    //THIS FUNCTION RETURN THE COMMENT ARRAY WITH SPECIFIC POST ID
    getCommentsByID(req, res) {
        try {
            //CHECKING IF COMMENTS ARE PRESENT FOR THE POST OR NOT
            const postID = req.params.id;
            const comments = commentModel.getCommentsByID(postID);
            //IF NO COMMENTS FOUND
            if (comments.length == 0) {
                return res.status(404).send("Comments Not Found.");
            }
            //IF COMMENTS FOUND
            return res.status(200).send(comments);
        } catch (err) {
            //HANDLING UNEXPECTED ERROR
            throw new ApplicationError("Failed To Fetch Comments.", 500);
        }
    }
    //THIS FUNCTIONS CREATES THE COMMENT FOR THE POST WITH SPECIFCIC POST ID
    addComment(req, res) {
        try {
            //CHECKING IF THE POST ID IS VALID OR NOT
            const postID = req.params.id;
            const newComment = commentModel.addComment(postID, req.body);
            // IF POST ID IS NOT VALID 
            if (!newComment) {
                return res.status(404).send("Post Not Found.");
            }
            //IF POST ID IS VALID 
            return res.status(201).send(newComment);
        } catch (err) {
            //HANDLING UNEXPECTED ERROR
            throw new ApplicationError("Failed To Add Comment.", 500);
        }

    }
    //THIS FUNCTION DELETES THE COMMENT OBJECT AND RETURNS THAT
    deleteCommentByID(req, res) {
        try {
            //CHECKING IF THE COMMENT BELONGS TO THE LOGGED IN USER OR NOT 
            const commentID = req.params.id;
            const deteledComment = commentModel.deleteCommentByID(commentID);
            // IF COMMENT DOES NOT BELONG TO THE LOGGED IN USER
            if (!deteledComment) {
                return res.status(404).send("Comment Not Found.")
            }
            //IF THE COMMENT DOES BELONG TO THE LOGGED IN USER
            return res.status(200).send(deteledComment);
        } catch (err) {
            //HANDLING UNEXPECTED ERROR
            throw new ApplicationError("Failed To Delete Comment.", 500);
        }

    }
    //THIS FUNCTION UPADATES THE COMMENT AND RETURN THE UPDATED COMMENT OBJECT
    updateCommentByID(req, res) {
        try {
            //CHECKING IF THE COMMENT BELONGS TO THE LOGGED IN USER OR NOT 
            const commentID = req.params.id;
            const updatedComment = commentModel.updateCommentByID(commentID, req.body);
            // IF COMMENT DOES NOT BELONG TO THE LOGGED IN USER
            if (!updatedComment) {
                return res.status(404).send("Comment Not Found.");
            }
            //IF THE COMMENT DOES BELONG TO THE LOGGED IN USER
            return res.status(201).send(updatedComment);

        } catch (err) {
            //HANDLING UNEXPECTED ERROR
            throw new ApplicationError("Failed To Update Comment.", 500);
        }


    }

}


