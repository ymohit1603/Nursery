import express, { Response,Request } from "express";
import { isAuthenticated } from "../../middleware/auth";
const router = express.Router();

router.get('/',isAuthenticated, (req:Request,res:Response) => {
    
})

export default router;