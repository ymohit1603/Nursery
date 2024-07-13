import express from "express";
import signinRouter from "./signin";
import signupRouter from "./signup";
import userCart from "../cart";

const router = express.Router();

router.use("/signin", signinRouter);
router.use("/signup", signupRouter);
router.use("/cart", userCart);

export default router;
