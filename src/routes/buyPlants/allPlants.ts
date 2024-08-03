import { Prisma } from "@prisma/client";
import { isAuthenticated } from "../../middleware/auth";
import prisma from "../../utils/prisma";
import express, { Request, Response } from "express";

const router = express.Router();

//get all plants
router.get("/", async (req: Request, res: Response) => {
    const { category, sort } = req.query;

    if (sort && sort !== 'asc' && sort !== 'desc') {
        return res.status(400).json({ message: "Invalid sort parameter. Use 'asc' or 'desc'." });
    }

    try {
        const where: Prisma.buyPlantWhereInput = category ? { category: category as string } : {};
        
        const orderBy: Prisma.buyPlantOrderByWithRelationInput[] | undefined = sort ? [{ Price: sort as Prisma.SortOrder }] : undefined;
        
        const result = await prisma.buyPlant.findMany({
            where,
            orderBy,
        });
        console.log('inside try block');
        res.status(200).json({ plants: result ,message:"success"});
    }
    catch (error) {
        console.log('inside catch block');
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
        console.log("break");
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;
