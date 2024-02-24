import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";
import ApplicationError from "../../errorHandler/application.error.js";
const userModel = new UserModel();
export default class UserController {
    //THIS FUNCTION IS FOR USER REGISTRATION 
    signup(req, res) {
        try {
            //CHECKING IF THE USER ALREADY EXISTS OR NOT 
            const newUser = userModel.addNewUser(req.body);
            //IF USER EXISTS
            if (!newUser) {
                return res.status(409).send("Email Already Exists");
            }
            //IF USER DOES NOT EXISTS
            return res.status(201).send(newUser);
        } catch (err) {
            //CATCHING UNEXPECTED ERRORS HERE
            throw new ApplicationError("Registration Failed", 500);
        }
    }
    //THIS FUNCTON IS FOR USER LOG IN 
    signin(req, res) {
        try {
            //CHECKING IF IT IS A VALID USER OR NOT
            const validUser = userModel.confirmUser(req.body);
            //IF USER IS NOT VALID 
            if (!validUser) {
                return res.status(400).send("Wrong Credentials");
            }
            //IF USER IS VALID THEN SEND THE AUTHENTICATION TOKEN TO IT
            const token = jwt.sign({ UserID: validUser.UserID, Email: validUser.Email }, "C3vYbr2by8", { expiresIn: '1h' });
            return res.status(200).send(token);
        } catch (err) {
            //CATCHING UNEXPECTED ERRORS HERE
            throw new ApplicationError("Log-In Failed", 500);
        }
    }
}

