import prisma from "../../prisma";
import express, { Request, Response } from "express";

const router = express.Router();

//return all blogs
router.get("/", async (req: Request, res: Response) => {
    try {   
        const blogs = await prisma.plant.findMany();
        res.status(200).json({ blogs: blogs });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
});

//create new blog
router.post("/",async (req: Request, res: Response) => {
    const {id,name,category,description} = req.body;

    if (!id||!name||!category||!description) {
        res.status(400).json({ error: "Blog Body required" });
    }

    try {
        const newBlog = await prisma.plant.create({
            data: {
                id,
                name,
                category,
                description
            }
        });
        res.status(200).json({ message: "Blog created" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//get blog by id
router.get("/:id", async (req: Request, res: Response) => {
    const { blogId } = req.params;
    if (!blogId) {
        res.status(400).json({ error: "blogId required" });
    }
    try {
        const singleBlog = await prisma.plant.findUnique({
            where: {
                id: parseInt(blogId)
            }
        });
        res.status(200).json({ Blog: singleBlog });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
});

export default router;