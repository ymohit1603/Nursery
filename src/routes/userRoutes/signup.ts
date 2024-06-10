import { Request, Response } from "express";
import router from "./signin";
import prisma from "../../utils/prisma";
import { userSchema } from "../../utils/zodValidation";
import { signToken } from "../../utils/jwt";
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
                const token = signToken({ id: newUser.id });
                res.cookie("token", token);
                res.status(200).json({ message: "Successfully signed up", token:token});
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Error while signing up" });
    }
});
