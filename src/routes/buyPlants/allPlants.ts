import { isAuthenticated } from "../../middleware/auth";
import prisma from "../../utils/prisma";
import express, { Request, Response } from "express";

const router = express.Router();

//get all plants
router.get("/", async (req: Request, res: Response) => {
    
    try {
        const result = await prisma.buyPlant.findMany();
        res.status(200).json({ plants: result ,message:"success"});
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//get plant by id
router.get('/:id' , async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "id requires" });
    }


    try {
        const result=await prisma.buyPlant.findUnique({
            where: {
                id: parseInt(id),
            }
        });
        if (!result) {
            return res.status(400).json({ message: "No plant exists with this id" });
        }
        res.status(200).json({ plant: result });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;
