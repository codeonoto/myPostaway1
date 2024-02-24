//THIS PROJECT IS CREATED BY AKASH VERMA 
import express from "express";
import swagger from 'swagger-ui-express';
import apiDocs from "./swagger.json" assert {type: 'json'};
import loggerMiddleware from "./middleware/logger.middleware.js";
import jwtAuthoriser from "./middleware/jwt.middleware.js";
import { userRouter } from "./features/user/user.route.js";
import { postRouter } from "./features/post/post.route.js";
import { commentRouter } from "./features/comment/comment.route.js";
import { likeRouter } from "./features/like/like.route.js";
import ApplicationError from "./errorHandler/application.error.js";
const server = express();
import bodyParser from "body-parser";

//THIS IS THE BODY PARSER MIDDLEWARE
server.use(bodyParser.json());

//THIS MIDDLEWARE LOGS EVERY REQUEST URL AND REQUEST BODY IN [log.txt] FILE
server.use(loggerMiddleware);

//THIS MIDDLEWARE IS FOR API DOCUMENTATION
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//THIS MIDDLEWARE REDIRECTS EVERY REQUEST TO THE [postRouter] WHICH CORRESPONDS TO POSTS
server.use("/api/posts", jwtAuthoriser, postRouter);

//THIS MIDDLEWARE REDIRECTS EVERY REQUEST TO THE [userRouter] WHICH CORRESPONDS TO USER
server.use("/api/user", userRouter);

//THIS MIDDLEWARE REDIRECTS EVERY REQUEST TO THE [commentRouter] WHICH CORRESPONDS TO COMMENTS
server.use("/api/comments", jwtAuthoriser, commentRouter);

//THIS MIDDLEWARE REDIRECTS EVERY REQUEST TO THE [likeRouter] WHICH CORRESPONDS TO LIKES
server.use("/api/likes", jwtAuthoriser, likeRouter);

//TESTING ROUTE
server.get("/", (req, res) => {
    return res.send("The server is working.");
});

//HANDLING WRONG APIs 
server.use((req, res) => {
    return res.status(404).send("API NOT FOUND, Please Check The API And Try Again.");
});

//HANDLING APPLICATION LEVEL ERRORS LIKE SYNTAX ERROR AND OTHERS.
server.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
        return res.status(err.statusCode).send(err.message);
    }
    //IF ERROR IS NOT DEFINED THE USER WILL GET THIS RESPONSE.
    return res.status(500).send("Something Went Wrong Please Try Again Later.");
})

server.listen(4000, () => {
    console.log("The server is listening on port number 4000.");
});