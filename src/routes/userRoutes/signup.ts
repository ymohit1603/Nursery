import { Request, Response } from "express";
import { router, prisma } from "./signin";
router.post("/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(400).json({ error: "Email and passwords are required" });
    }

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
