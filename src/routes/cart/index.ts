import express, { Request, Response } from "express";
import { isAuthenticated } from "../../middleware/auth";
import prisma from "../../utils/prisma";
import { User } from "@prisma/client";
import { myRequest } from '../../types';
import { JwtPayload } from "jsonwebtoken";
const router = express.Router();


router.get('/', isAuthenticated, async (expressreq: Request, res: Response) => {
    
    const req = expressreq as myRequest;
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

router.post('/', isAuthenticated, async (expressreq: Request, res: Response) => {
    const req = expressreq as myRequest;
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


router.delete('/', isAuthenticated, async (expressreq: Request, res: Response) => {
    const req = expressreq as myRequest;
    const userId = req.user.id;
    const { plantId } = req.body;

    if (!plantId) {
        return res.status(400).json({ error: "Plant ID required" });
    }

    try {
        const userCart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            }
        });

        if (!userCart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                plantId: plantId,
            }
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        await prisma.cartItem.delete({
            where: {
                id:cartItem.id,
            }
        });

        res.status(200).json({ message: "Item deleted from cart" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;