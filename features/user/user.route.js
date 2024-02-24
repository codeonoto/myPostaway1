import express from "express";

import bodyParser from "body-parser";

import UserController from "./user.controller.js";
const userController = new UserController();
export const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);
