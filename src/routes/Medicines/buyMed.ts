import { Request, Response } from "express";
import prisma from "../../prisma";
import router from "./med";

router.post('/order', async (req:Request, res:Response) => {
    const { userId, medicineId, quantity } = req.body;

    if (!userId || !medicineId || !quantity) {
        return res.status(400).json({ error: 'userId, medicineId, and quantity are required' });
      }
    
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
