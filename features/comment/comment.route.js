import express from "express";
import bodyParser from "body-parser";
import CommentController from "./comment.controller.js";

const commentController = new CommentController();
export const commentRouter = express.Router();
commentRouter.use(bodyParser.json());

commentRouter.get("/:id", commentController.getCommentsByID);
commentRouter.post("/:id", commentController.addComment);
commentRouter.delete("/:id", commentController.deleteCommentByID);
commentRouter.put("/:id", commentController.updateCommentByID);

