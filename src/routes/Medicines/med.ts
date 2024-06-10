import express, { Request,Response } from "express";
import prisma from "../../utils/prisma";
import { medicineSchema } from "../../utils/zodValidation";
import { isAuthenticated } from "../../middleware/auth";

const router = express.Router();

//list all medicines.
router.get("/", isAuthenticated,async (req: Request, res: Response) => {
    try {
        const allMedicines = await prisma.medicine.findMany();
        res.status(200).json({ data: allMedicines });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//get particular medicine.
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: "Medicine Id required" });
    }

    try {
        const medicine=await prisma.medicine.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!medicine) {
            res.status(400).json({ error: "Invalid Medicine Id" });
        }
        res.status(200).json({ Medicine: medicine });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//add medicine.
router.post("/", async (req: Request, res: Response) => {
    const result = medicineSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(result.error.errors);
    }

  const { name, description, price, stock } = result.data;

    try {
        const newMedicine=await prisma.medicine.create({
            data: {
                name,
                description,
                price:price,
                stock:stock,
            }
        });
        res.status(200).json({ message: "New medecine added", newMedicine });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;