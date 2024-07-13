import express, { Response,Request } from "express";
import { isAuthenticated } from "../../middleware/auth";
import prisma from "../../utils/prisma";
const router = express.Router();

router.get('/', isAuthenticated, async (req: Request, res: Response) => {
    const userId = req.user.id;

    try {
        const userCart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            },
            include: {
                items: {
                    include: {
                        plant: true,
                    }
                }
            }
        });
        res.status(200).json({ userCart: userCart });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/', isAuthenticated, async (req, res) => {
    const userId = req.user.id;

    const { plantId, quantity } = req.body;

    if (!plantId || !quantity) {
        res.status(400).json({ message: "Plant id and quantity required" });
    }

    try {
        let userCart = await prisma.cart.findFirst({
            where: {
                userId: userId
            }
        })

        if (!userCart) {
            userCart = await prisma.cart.create({
                data: {
                    userId: userId
                }
        });
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                plantId: plantId
            }
        });

        if (existingCartItem) {
            
            await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id
                },
                data: {
                    quantity: existingCartItem.quantity + quantity
                }
            });
        } else {
           
        await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    plantId: plantId,
                    quantity: quantity
                }
        });
        }
        res.status(200).json({ message: "Item added to cart" });
    }
    catch (error) {
        res.status(500).json({ message: "INternal server error" });
    }

})

export default router;