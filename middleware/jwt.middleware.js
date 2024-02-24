//THIS IS THE AUTHENTICATION MIDDLEWARE 
import jwt from 'jsonwebtoken';
// THIS VARIABLE HOLDS THE ID OF THE LOGGED IN USER
export let loggdInUserID;
const jwtAuthoriser = (req, res, next) => {
    //CHECKING IF THE REQUEST HEADER CONTAINS THE TOKEN OR NOT
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send("Unauthorized Access");
    }
    try {
        //VERIFYING THE TOKEN GOT FROM REQUEST HEADER
        const payload = jwt.verify(token, 'C3vYbr2by8');
        req.UserID = payload.UserID;
        //GETTING THE USER ID OF THE LOGGED IN USER
        loggdInUserID = payload.UserID;
    } catch (err) {
        return res.status(401).send("Unauthorized Access");
    }
    next();
}

export default jwtAuthoriser;

