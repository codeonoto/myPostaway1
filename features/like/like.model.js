import { loggdInUserID } from "../../middleware/jwt.middleware.js";
import PostModel from "../post/post.model.js";
const postModel = new PostModel();
export default class LikeModel {
    constructor(userID, postID) {
        this.userID = userID,
            this.postID = postID

    }
    //THIS FUNCTION RETURNS THE ARRAY OF LIKES OBJECT
    getLikesByID(postID) {
        //FETCHING THE LIKE FOR A POST WITH SPECIFIC POST
        const likes = likeModelArray.filter((l) => {
            return l.postID == postID;
        });
        //IF NO LIKES FOUND
        if (likes.length == 0) {
            return;
        }
        //IF LIKES FOUND
        return likes;
    }
    //THIS FUNCTION LIKED THE POST AND IF ALREADY LIKED THEN UNLIKES IT 
    likeAndUnlike(postID) {
        //CHECKING IF THE POST IS PRESENT OR NOT 
        const isPostExist = postModel.getPostModelArray().find((p) => {
            return p.PostID == postID;
        });
        //IF THE POST IS NOT PRESENT
        if (!isPostExist) {
            return "Post Not Found";
        }
        //CKECKING IF THE POST IS ALRAEDY LIKED OR NOT 
        const likeObj = likeModelArray.find((l) => {
            return l.postID == postID && l.userID == loggdInUserID;
        });
        // IF THE POST IS ALRAEDY LIKED 
        if (likeObj) {
            const index = likeModelArray.findIndex((l) => {
                return l.postID == postID && l.userID == loggdInUserID;
            });
            likeModelArray.splice(index, 1);
            return "Post Is Already Liked";
        } else {
            //IF POST IS NOT LIKED 
            const newLikeObj = new LikeModel(loggdInUserID, Number(postID));
            newLikeObj.likeID = likeModelArray.length + 1;
            likeModelArray.push(newLikeObj);
            return newLikeObj;
        }

    }
}
const likeModelArray = [
    {
        userID: 1,
        postID: 1,
        likeID: 1

    },
    {
        userID: 1,
        postID: 2,
        likeID: 2

    },
    {
        userID: 2,
        postID: 1,
        likeID: 3

    },
    {
        userID: 1,
        postID: 2,
        likeID: 4

    }
];