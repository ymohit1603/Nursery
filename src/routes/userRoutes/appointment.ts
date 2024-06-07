import { Request, Response } from "express";
import { router, prisma } from "./signin";

router.post("/appointment", async (req: Request, res: Response) => {
    const { date, userId } = req.body;
    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                date: date,
                userId: userId
            }
        });
        if (!newAppointment) {
            res.status(400).json({ message: "Error in creating new Appointment" });
        }
        res.status(200).json({ message: "New appointment created.", newAppointment: newAppointment });
    }
    catch (error) {
        res.status(500).json({ error: "Error in creating appointment" });
    }
});

router.get("/appointment/:userId",async (req:Request, res:Response) => {
    const { userId } = req.params;

    try {
        const appointments = await prisma.appointment.findMany({
          where: { userId: parseInt(userId) },
        });
        res.status(200).json(appointments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching appointments" });
      }
    });
    