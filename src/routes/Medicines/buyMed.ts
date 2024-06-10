import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import router from "./med";
import { orderSchema } from "../../utils/zodValidation";
import { isAuthenticated } from "../../middleware/auth";

router.post('/order',isAuthenticated, async (req:Request, res:Response) => {
    
    const result = orderSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error.errors);
    }
  
    const { userId, medicineId, quantity } = result.data;
  
      try {
        const medicine = await prisma.medicine.findUnique({
          where: { id: medicineId },
        });
    
        if (!medicine) {
          return res.status(404).json({ error: 'Medicine not found' });
        }
    
        if (medicine.stock <= 0) {
          return res.status(400).json({ error: 'Medicine is out of stock' });
        }
    
        if (medicine.stock < quantity) {
          return res.status(400).json({ error: 'Not enough stock available' });
        }
    
        const order = await prisma.order.create({
          data: {
            userId,
            medicineId,
            quantity,
            status: 'pending',
          },
        });
    
        await prisma.medicine.update({
          where: { id: medicineId },
          data: { stock: medicine.stock - quantity },
        });
    
        res.status(201).json(order);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
});
