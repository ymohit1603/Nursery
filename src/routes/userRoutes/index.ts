import express from "express";
import signinRouter from "./signin";
import signupRouter from "./signup";
import userCart from "../cart";
import logoutRouter from "./logout";

const router = express.Router();

router.use("/logout", logoutRouter);
router.use("/signin", signinRouter);
router.use("/signup", signupRouter);
router.use("/cart", userCart);

export default router;
