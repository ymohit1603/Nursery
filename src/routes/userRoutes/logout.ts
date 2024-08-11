import express,{ Response,Request } from "express";
import {  isAuthenticated } from "../../middleware/auth";
const router = express.Router();

router.post("/", isAuthenticated, (req: Request, res: Response) => {
    console.log("Hit me up babe");
    res.clearCookie('jwt', { path: '/' });
    res.status(200).send({ message: 'Logged out successfully' });
})

export default router;