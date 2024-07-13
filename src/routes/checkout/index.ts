import express from "express";

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const items = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: { price: number; quantity: number; }) => ({
          price_data: {
            currency: 'usd',
            unit_amount: item.price,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        // success_url: `${YOUR_DOMAIN}?success=true`,
        // cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    
      res.redirect(303, session.url);
    });