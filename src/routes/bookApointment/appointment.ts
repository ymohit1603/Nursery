import express,{Request,Response} from "express";
import prisma from "../../prisma";
import { appointmentSchema, cancelAppointmentSchema } from "../../zodValidation";

const router = express.Router();

//book an appointment
router.post("/", async (req: Request, res: Response) => {
  const result = appointmentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  const { userId, nurseryId, date, status } = result.data;

    if (!userId || !nurseryId || !date) {
        res.status(400).json({ message: "Fill all fields" });
    }

    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                userId,
                nurseryId,
                date,
                status:"Booked",
            }
        });
        res.status(200).json({ message: "Appointment created", newAppointment });
    }
    catch (error) {
        res.status(500).json({ message: "Interval Server Error" });
    }
});


//cancel an appointment
router.put("/cancel", async (req: Request, res: Response) => {
  const result = cancelAppointmentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  const { userId, nurseryId } = result.data;

  try {
    const appointment = await prisma.appointment.findFirst({
      where: {
        userId,
        nurseryId,
        status: 'pending',
      },
    });

    if (!appointment) {
      return res.status(404).json({ error: 'No pending appointment found for the specified user and nursery' });
    }

    const canceledAppointment = await prisma.appointment.update({
      where: { id: appointment.id },
      data: { status: 'canceled' },
    });

    res.status(200).json({ message: 'Appointment canceled successfully', canceledAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;