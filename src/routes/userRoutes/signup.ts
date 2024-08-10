import express, { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { userSchema } from "../../utils/zodValidation";
import { signToken } from "../../utils/jwt";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        console.log(result.error);
        return res.status(400).json({error:"Invalid credential"});
    }

    const { email, password } = result.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
        }
        else {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    password: password
                }
            });
            if (newUser) {
                const token = signToken({ id: newUser.id });
                res.cookie("jwt", token);
                res.status(200).json({ message: "Successfully signed up", token:token});
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Error while signing up" });
    }
});

export default router;

