import { Response,Request } from "express";
import {  isAuthenticated } from "../../middleware/auth";
import router from "./signin";


router.post("/logout",isAuthenticated, (req:Request, res:Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: "cookie cleared" });
})