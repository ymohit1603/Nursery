import prisma from "../../utils/prisma";
import express, { Request, Response } from "express";

import router from "./allPlants";
import { isAuthenticated } from "../../middleware/auth";
import { orderPlant } from "../../utils/zodValidation";

//buy plants
router.post("/:id/buy", isAuthenticated, async (req: Request, res: Response) => {
    
    const parsedBody = orderPlant.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ errors: parsedBody.error.errors });
    }
    const { userId, quantity, status } = parsedBody.data;
    const { id } = req.params;
    
    try {
        const result = await prisma.plantOrders.create({
            data: {
                userId,
                plantId:parseInt(id),
                quantity,
                status
            }
        })
        res.status(200).json({ result: result });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
       
});

export default router;
