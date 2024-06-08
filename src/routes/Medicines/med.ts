import express, { Request,Response } from "express";
import prisma from "../../prisma";

const router = express.Router();

//list all medicines.
router.get("/", async (req: Request, res: Response) => {
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
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
        res.status(400).json({ error: "Incomplete Body" });
    }

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    if (isNaN(parsedPrice) || isNaN(parsedStock)) {
        return res.status(400).json({ error: 'Price and stock must be valid numbers' });
    }

    try {
        const newMedicine=await prisma.medicine.create({
            data: {
                name,
                description,
                price:parsedPrice,
                stock:parsedStock,
            }
        });
        res.status(200).json({ message: "New medecine added", newMedicine });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default express;