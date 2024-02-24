//THIS MIDDLEWARE IS HANDLING ALL THE REQUEST FILES
import multer from "multer";
const storage = multer.diskStorage({
    //DEFINING THE DESTINATION WHERE ALL THE FILES WILL BE STORED
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    //DEFINING THE FILE NAME OF THE UPLOADED FILES
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        const fileName = uniqueSuffix + '.' + fileExtension;
        cb(null, fileName);
    }
});
export const upload = multer({ storage: storage });
