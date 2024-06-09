import { Request, Response } from "express";
import router from "./signin";
import prisma from "../../prisma";
import { userSchema } from "../../zodValidation";
router.post("/signup", async (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(result.error.errors);
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
                res.status(200).json({ message: "Successfully signed up", user: newUser });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Error while signing up" });
    }
});
