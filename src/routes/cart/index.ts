import express, { Request, Response } from "express";
import { isAuthenticated } from "../../middleware/auth";
import prisma from "../../utils/prisma";
import { myRequest } from '../../types';
const router = express.Router();


router.get('/', isAuthenticated, async (req,res) => {
    

        const userId = req.body.id
    

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

router.post('/', isAuthenticated, async (req,res) => {
    
    const { plantId, quantity } = req.body;

    if (!plantId || !quantity) {
        return res.status(400).json({ message: "User ID, Plant ID, and quantity are required" });
    }
    
    const userId = req.body.user.id;
    console.log("userId", userId);
    try {
   
        let userCart = await prisma.cart.findFirst({
            where: { userId }
        });

        if (!userCart) {
            console.log("No userCart found, creating one");
            userCart = await prisma.cart.create({
                data: { userId }
            });
        }

        console.log(userCart, "userCart");

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                plantId:parseInt(plantId)
            }
        });

        console.log(existingCartItem, "existing cart");

        let cartItem;
        if (existingCartItem) {
            console.log("Updating cart item");
            cartItem = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity }
            });
        } else {
            console.log("Creating new cart item");
            cartItem = await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    plantId:parseInt(plantId),
                    quantity:parseInt(quantity)
                }
            });
        }

        return res.status(200).json({ message: "Item added to cart", cart: cartItem });

    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

})


router.delete('/', isAuthenticated, async (req,res) => {
  
    const userId = req.body.id;
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