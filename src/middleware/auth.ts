import {  Response, NextFunction, RequestHandler, Request } from "express";
import { verifyToken } from "../utils/jwt";
import prisma from "../utils/prisma";
import { myRequest } from '../types';

interface JwtPayload {
    userId: number;
    email: string;
  }

export const isAuthenticated = async (expressreq: Request, res: Response, next: NextFunction) => {
    const req=expressreq as myRequest
    const token = req.cookies.jwt;

    if (!token) {
        res.status(400).json({ error: "Token required" });
    }

    try {
        const decoded = verifyToken(token);

        if (typeof decoded === 'string') {
          return res.sendStatus(403);
        }
    
        const { userId } = decoded as JwtPayload;
        const user = await prisma.user.findUnique({ where: { id: userId } });
    
        if (!user) {
          return res.sendStatus(401);
        }

        req.user = user;
    
        next();
    }
    catch (error) {
        res.status(500).json("Internal Server error");
    }
}