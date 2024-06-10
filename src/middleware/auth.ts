import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(400).json({ error: "Token required" });
    }

    try {
        const decoded = verifyToken(token);
        next();
    }
    catch (error) {
        res.status(500).json("Internal Server error");
    }
}