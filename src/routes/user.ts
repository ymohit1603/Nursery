import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = express.Router();

router.get("/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(400).json({ error: "Email and passwords are required" });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email:email
            }
        })   

        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
        }
        else {            
            const newUser =await prisma.user.create({
                data: {
                    email: email,
                    password: password
                }
            })
            if (newUser) {
                res.status(200).json({ message: "Successfully signed up" ,user:newUser});
            }
        }
    } catch (error) {       
        res.status(500).json({ error: "Error while signing up" });
    }
});

router.get("/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and Password are required" });
    }

    try {     
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
                password:password
            }
        })
        if (!existingUser) {
            res.status(400).json({ error: "Incorrect Credentials" });
        }
        res.status(200).json({ message: "Successfully Signed Up" });
    }
    catch (error) {
        res.status(500).json({ error: "Error while signing up" });
    }
});

export default router;