import express from "express";
import { formData } from "../../utils/zodValidation";
import prisma from "../../utils/prisma";

const router = express.Router();

router.post('/',async (req,res) => {
    const contactData = formData.safeParse(req.body);
    if (!contactData.success) {
       return res.status(400).json(contactData.error.errors);
    }

    const { email, message } = contactData.data;

    try {
         const result=await prisma.form.create({
            data: {
                email: email,
                message: message
            }
         });
        if (!result) {
            return res.status(500).json({ message: "error saving data" });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        res.status(500).json({ error:"Internal server error" });
    }
    
})

export default router;