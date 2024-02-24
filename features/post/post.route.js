import express from "express";
import { upload } from "../../middleware/fileupload.middleware.js";
import PostController from "./post.controller.js";
import bodyParser from "body-parser";

const postController = new PostController();
export const postRouter = express.Router();

postRouter.use(bodyParser.json());

postRouter.get("/all", postController.getAllPosts);
postRouter.get("/:id", postController.getPostByPostID);
postRouter.get("/", postController.getPostByUserID);
postRouter.post("/", upload.single('ImageURL'), postController.createPost);
postRouter.delete("/:id", postController.deletePostByID);
postRouter.put("/:id", upload.single('ImageURL'), postController.updatePostByID);