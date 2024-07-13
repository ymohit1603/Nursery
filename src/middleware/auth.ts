import {  Response, NextFunction, RequestHandler, Request } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";


export const isAuthenticated= (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(400).json({ error: "Token required" });
    }

    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json("Internal Server error");
    }
}