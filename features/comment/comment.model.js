import { loggdInUserID } from "../../middleware/jwt.middleware.js";
import PostModel from "../post/post.model.js";
const postModel = new PostModel();
export default class CommentModel {
    constructor(postID, userID, comment) {
        this.postID = postID,
            this.userID = userID,
            this.comment = comment
    }
    //THIS FUNCTION RETURN THE ARRAY OF COMMENTS OBJECT WITH A SPECIFIC POST ID
    getCommentsByID(postID) {
        const comments = commentModelArray.filter((c) => {
            return c.postID == postID;
        });
        return comments;
    }
    //THIS FUNCTION ADD COMMENT OBJECT TO [commentModelArray] AND RETURNS THAT OBJECT
    addComment(postID, commentObj) {
        //CHECKING IF THE POST WITH THE SPECIFIC ID PRESENT OR NOT 
        const post = postModel.getPostModelArray().find((p) => {
            return p.PostID == postID;
        })
        // IF POST IS NOT PRESENT
        if (!post) {
            return;
        }
        //IF POST IS PRESENT
        const { comment } = commentObj;
        const newComment = new CommentModel(Number(postID), loggdInUserID, comment);
        newComment.commentID = commentModelArray.length + 1;
        commentModelArray.push(newComment);
        return newComment;
    }
    //THIS FUNCTION DELETES THE COMMENTS OBJECT FROM THE [commentModelArray] AND RETURNS THAT OBJECT
    deleteCommentByID(commentID) {
        //CHECKING IF THE COMMENTS BELONGS TO THE LOGGED IN USER OR NOT
        const index = commentModelArray.findIndex((c) => {
            return c.commentID == commentID && c.userID == loggdInUserID;
        });
        //IF THE COMMENT DOES NOT BELONG TO THE LOGGED IN USER
        if (index < 0) {
            return;
        }
        // IF THE COMMENT DO BELONG TO THE LOGGED IN USER
        const deletedComment = commentModelArray.splice(index, 1);
        return deletedComment;

    }
    //THIS FUNCTION UPDATES THE EXIXSTING COMMENTS AND RETURN THE NEW COMMENT OBJECT
    updateCommentByID(commentID, commentObj) {
        //CHECKING IF THE COMMENTS BELONGS TO THE LOGGED IN USER OR NOT
        const index = commentModelArray.findIndex((c) => {
            return c.commentID == commentID && c.userID == loggdInUserID;
        });
        //IF THE COMMENT DOES NOT BELONG TO THE LOGGED IN USER
        if (index < 0) {
            return;
        }
        // IF THE COMMENT DO BELONG TO THE LOGGED IN USER
        const oldCommentObj = commentModelArray[index];
        const { postID } = oldCommentObj;
        const { comment } = commentObj;
        const updatedComment = new CommentModel(postID, loggdInUserID, comment);
        updatedComment.commentID = commentID;
        commentModelArray.splice(index, 1, updatedComment);
        return updatedComment;

    }

}
const commentModelArray = [
    {
        postID: 1,
        userID: 1,
        comment: "Very Nice Pic",
        commentID: 1
    },
    {
        postID: 1,
        userID: 2,
        comment: "Awsome Pic",
        commentID: 2
    },
    {
        postID: 2,
        userID: 1,
        comment: "Beautiful Pic",
        commentID: 3
    },
    {
        postID: 2,
        userID: 2,
        comment: "Outstanding Pic",
        commentID: 4
    },

];