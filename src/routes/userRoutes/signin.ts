import express, { Request, Response } from "express";
import prisma from "../../prisma";
import { userSchema } from "../../zodValidation";
const router = express.Router();

router.post("/signin", async (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(result.error.errors);
    }

    const { email, password } = result.data;

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