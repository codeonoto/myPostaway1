import PostModel from "./post.model.js"
import { loggdInUserID } from "../../middleware/jwt.middleware.js";
import ApplicationError from "../../errorHandler/application.error.js";
const postModel = new PostModel();
export default class PostController {
    //THIS FUNCTION RETURNS ALL THE POSTS AVIALABLE ON THE SERVER
    getAllPosts(req, res) {
        try {
            //CHECKING IF POSTS ARE AVAILABLE OR NOT
            const posts = postModel.getPostModelArray();
            //IF NO POSTS FOUND
            if (posts.length == 0) {
                return res.status(404).send("Post Not Found.");
            }
            //IF POST FOUND
            return res.status(200).send(posts);
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS
            throw new ApplicationError("Failed To Fetch Posts.", 500);
        }
    }
    //THIS FUNCTION RETURNS ALL THE POSTS FOR A SPECIFIC USER
    getPostByUserID(req, res) {
        try {
            //CHECKING IF POSTS ARE AVAILABLE OR NOT
            const posts = postModel.getPostByUserID(loggdInUserID);
            //IF NO POSTS FOUND
            if (posts.length == 0) {
                return res.status(404).send("Post Not Found.");
            }
            //IF POST FOUND
            return res.status(200).send(posts);
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS
            throw new ApplicationError("Failed To Fetch Posts.", 500);
        }
    }
    //THIS FUNCTION RETURNS THE POST WITH A SPECIFIC POST ID
    getPostByPostID(req, res) {
        try {
            //CHECKING IF THE POST IS AVAILABLE OR NOT
            const postID = req.params.id;
            const post = postModel.getPostByPostID(postID);
            if (!post) {
                //IF POST NOT FOUND
                return res.status(404).send("Post Not Found.");
            }
            //IF POST FOUND
            return res.status(200).send(post);
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS
            throw new ApplicationError("Failed To Fetch Post.", 500);
        }
    }
    //THIS FUNCTION CREATES A NEW POST
    createPost(req, res) {
        try {
            //CREATING THE POST AND RETURNING IT TO THE CLIENT
            const ImageURL = req.file.filename;
            const newPost = postModel.createPost(req.body, ImageURL);
            return res.status(201).send(newPost);
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS
            throw new ApplicationError("Failed To Create Post.", 500);
        }
    }
    //THIS FUNCTION DELETES THE POST WITH A SPECIFIC POST ID
    deletePostByID(req, res) {
        try {
            //CHECKING IF THE POST IS AVAILABLE TO DELETE OR NOT
            const postID = req.params.id;
            const deletedPost = postModel.deletePostByID(postID);
            //IF POST IS NOT AVAILABLE 
            if (!deletedPost) {
                return res.status(404).send("Post Not Found.");
            }
            //IF AVAILABLE 
            res.status(200).send(deletedPost);
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS
            throw new ApplicationError("Failed To Delete Post.", 500);
        }
    }
    //THIS FUNCTION UPDATES A POST WITH A SPECIFIC ID
    updatePostByID(req, res) {
        try {
            const ImageURL = req.file.filename;
            const postID = req.params.id;
            //CHECKING IF THE POST IS AVAILABLE TO DELETE OR NOT
            const updatedPost = postModel.updatePostByID(postID, req.body, ImageURL);
            //IF POST IS NOT AVIALABLE
            if (!updatedPost) {
                return res.status(404).send("Post Not Found.");
            }
            //IF NOT AVAILABLE 
            return res.status(201).send(updatedPost);

        } catch (err) {
            //HANDLING UNEXPECTED ERRORS
            throw new ApplicationError("Failed To Update Post.", 500);
        }
    }

}