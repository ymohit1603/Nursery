import express, { Request, Response } from "express";

const router = express.Router();

router.get("/signup", (req: Request, res: Response) => {
    res.send("Signup Page for Nursery");
});

router.get("/signin", (req: Request, res: Response) => {
    res.send("Signin Page for Nursery");
});


export default router;