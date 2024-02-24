import { loggdInUserID } from "../../middleware/jwt.middleware.js";

export default class PostModel {
    constructor(UserID, Caption, ImageURL) {
        this.UserID = UserID,
            this.Caption = Caption,
            this.ImageURL = ImageURL
    }
    //THIS FUNCTION RETURN THE ARRAY OF POST WITH A SPECIFIC USER ID
    getPostByUserID(UserID) {
        const posts = postModelArray.filter((p) => {
            return p.UserID == UserID;
        });
        return posts;
    }
    //THIS FUNCTION RETURN A POST WITH A SPECIFIC POST ID
    getPostByPostID(postID) {
        const post = postModelArray.find((p) => {
            return p.PostID == postID;
        });
        return post;
    }
    //THIS FUNCTION RETURN ALL THE POSTS AVAILABLE ON THE SERVER
    getPostModelArray() {
        return postModelArray;
    }
    //THIS FUNCTION CREATES A NEW POST AND RETURNS THAT
    createPost(postObj, ImageURL) {
        const { Caption } = postObj;
        //CREATING THE POST OBJECT USING [PostModel] CLASS
        const newPost = new PostModel(loggdInUserID, Caption, ImageURL);
        newPost.PostID = postModelArray.length + 1;
        postModelArray.push(newPost);
        return newPost;
    }
    //THIS FUNCTION DEETES A POST WITH A SPECIFIC POST ID AND RETURNS THAT
    deletePostByID(postID) {
        //CHECKING IF THE POST IS BELONGS TO THE LOGGED IN USER OR NOT
        const index = postModelArray.findIndex((p) => {
            return p.PostID == postID && p.UserID == loggdInUserID;
        });
        if (index >= 0) {
            const deletedPost = postModelArray.splice(index, 1);
            return deletedPost;
        }
        return;
    }
    //THIS FUNCTION UPADATES THE POST WITH A SPECIFIC POST ID AND RETURN THAT UPDATED POST
    updatePostByID(postID, postObj, ImageURL) {
        //CHECKING IF THE POST IS BELONGS TO THE LOGGED IN USER OR NOT
        const index = postModelArray.findIndex((p) => {
            return p.PostID == postID && p.UserID == loggdInUserID;
        });
        if (index < 0) {
            return;
        }
        const { Caption } = postObj;
        const updatedPost = new PostModel(loggdInUserID, Caption, ImageURL);
        updatedPost.PostID = Number(postID);
        //UPDATING THE POST OBJECT
        postModelArray.splice(index, 1, updatedPost);
        return updatedPost;
    }
}
const postModelArray = [
    {
        UserID: 1,
        PostID: 1,
        Caption: "This is the sample caption for fisrt post",
        ImageURL: "https://m.media-amazon.com/images/I/81iiPvmfJvL._SY741_.jpg",
    }, {
        UserID: 1,
        PostID: 2,
        Caption: "This is the sample caption for second post",
        ImageURL: "https://m.media-amazon.com/images/I/81iiPvmfJvL._SY741_.jpg",

    }, {
        UserID: 2,
        PostID: 3,
        Caption: "This is the sample caption for third post",
        ImageURL: "https://m.media-amazon.com/images/I/81iiPvmfJvL._SY741_.jpg",
    }, {
        UserID: 2,
        PostID: 4,
        Caption: "This is the sample caption for fourth post",
        ImageURL: "https://m.media-amazon.com/images/I/81iiPvmfJvL._SY741_.jpg",
    }
];