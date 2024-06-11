import express, { Request, Response } from "express";
import { nurserySchema } from "../../utils/zodValidation";
import prisma from "../../utils/prisma";
import { signToken } from "../../utils/jwt";

const router = express.Router();

//signup route for nursery
router.get("/signup", async (req: Request, res: Response) => {
    const parsedBody = nurserySchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json(parsedBody.error.errors);
    }
    const {email,password, name, location, description } = parsedBody.data;
    try {
        const existingNursery = await prisma.nursery.findFirst({
            where: {
                email: email,
            }
        });
        if (existingNursery) {
            return res.status(400).json({ message: "Nursery already exists" });
        }
        const newNursery=await prisma.nursery.create({
            data: {
                name,
                email,
                password,
                location,
                description: description || "",
            }
        });
        const token = signToken({ id: newNursery.id });
        res.cookie("token", token);
        res.status(200).json({ message: "Successfully signed up", token:token});
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
});

//signin route for nursery
router.get("/signin", async (req: Request, res: Response) => {
    const parsedBody = nurserySchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json(parsedBody.error.errors);
    }
    const { email, password } = parsedBody.data;

    try {
        const isValidNursery = await prisma.nursery.findFirst({
            where: {
                email: email,
                password: password,
            }
        });
        if (!isValidNursery) {
            return res.status(400).json({ error: "Incorrect credential" });
        }
        const token = signToken({ id: isValidNursery.id });
        res.cookie("token", token);
        res.status(200).json({ message: "Successfully signed up", token:token});
    }
    catch (error) {
        res.status(500).json({message:"INterval server error"});
    }
});


export default router;