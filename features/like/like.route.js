import LikeController from "./like.controller.js";
import express from "express";
import bodyParser from "body-parser";

const likeController = new LikeController();
export const likeRouter = express.Router();
likeRouter.use(bodyParser.json());

likeRouter.get("/:id", likeController.getLikesByID);
likeRouter.get("/toggle/:id", likeController.likeAndUnlike);