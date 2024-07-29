import express from "express";
import prisma from "../../utils/prisma";



const router = express.Router();

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    
    if (!productId) {
        return res.status(400).json({ message: "productId required" });
    }

    try {
        const plantWithReviews = await prisma.buyPlant.findUnique({
            where: { id: parseInt(productId) },
            include: { Review: true }, 
        });

        if (!plantWithReviews) {
            return res.status(404).json({ message: "Plant not found" });
        }

        return res.status(200).json(plantWithReviews.Review);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/',async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ message: "Info required" });
    }
    const { productId, name, email, rating, review } = data;

    try {
        const newReview = await prisma.review.create({
            data: {
              name,
              email,
              rating,
              reviewText:review,
              plant: {
                connect: { id: productId },
              },
            },
        });
        return res.status(201).json(newReview);
    } catch (error){
        return res.status(500).json({ message: "Internal server error" });
    }
})

export default router;