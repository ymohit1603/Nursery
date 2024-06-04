import express, { Request, Response } from "express";

const router = express.Router();

router.get("/signup", (req: Request, res: Response) => {
    res.send("Signup Page for User");
});

router.get("/signin", (req: Request, res: Response) => {
    res.send("Signin Page for User");
});

export default router;