import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { plantSchema } from "../../zodValidation";

const router = express.Router();
const prisma = new PrismaClient();

// Return all plants
router.get("/", async (req: Request, res: Response) => {
  try {
    const plants = await prisma.plant.findMany();
    res.status(200).json({ plants });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server error" });
  }
});

// Create new plant
router.post("/", async (req: Request, res: Response) => {
  const result = plantSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  const { name, category, description } = result.data;

  try {
    const newPlant = await prisma.plant.create({
      data: {
        name,
        category,
        description: description || "",
      },
    });
    res.status(201).json({ message: "Plant created", newPlant });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get plant by id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: "Plant ID is required" });
  }

  try {
    const plantId = parseInt(id);
    if (isNaN(plantId)) {
      return res.status(400).json({ error: "Invalid Plant ID" });
    }

    const singlePlant = await prisma.plant.findUnique({
      where: {
        id: plantId,
      },
    });

    if (!singlePlant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    res.status(200).json({ plant: singlePlant });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server error" });
  }
});

export default router;