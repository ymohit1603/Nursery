import express, { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { userSchema } from "../../utils/zodValidation";
import { signToken } from "../../utils/jwt";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({error:"Invalid Credentials"});
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
        } else {
            const token = signToken({ id: existingUser.id });
            res.cookie("token", token);
            res.status(200).json({ message: "Successfully Signed Up" ,token:token});
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error while signing up" });
    }
});


export default router;