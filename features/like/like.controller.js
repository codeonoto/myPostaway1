import ApplicationError from "../../errorHandler/application.error.js";
import LikeModel from "./like.model.js";
const likeModel = new LikeModel();
export default class LikeController {
    //THIS FUNCTION RETURN THE ARRAY OF LIKE OBJECT WITH A SPECIFIC POST ID
    getLikesByID(req, res) {
        try {
            //cCHECKING IF THE LIKE FOR THE POST ARE AVAILABLE OF NOT 
            const postID = req.params.id;
            const likes = likeModel.getLikesByID(postID);
            //IF NO LIKES FOUND
            if (!likes) {
                return res.status(404).send("Likes Data Not Found.");
            }
            //IF LIKES FOUND
            return res.status(200).send(likes);
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS
            throw new ApplicationError("Failed To Fetch Likes Data.", 500);
        }
    }
    //THIS FUNCTION LIKES OR UNLIKES A POST WITH SPECIFIC POST ID
    likeAndUnlike(req, res) {
        try {
            //CHECKING IF POST IS ALREADY LIKED OR NOT
            const postID = req.params.id;
            const result = likeModel.likeAndUnlike(postID);
            //IF THE POST IS NOT PRESENT
            if (result === "Post Not Found") {
                return res.status(404).send("Post Not Found");
            }
            //IF THE POST IS ALREADY LIKED BY THE USER
            if (result === "Post Is Already Liked") {
                return res.status(210).send("Post Successfuly Unliked.");
            }
            //IF POST IS NOT LIKED BY THE USER
            return res.status(201).send(result);
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS
            throw new ApplicationError("Failed To Process Like/Unlike Operations.", 500);
        }
    }
}

