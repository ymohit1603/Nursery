import { Response, NextFunction, RequestHandler, Request } from "express";
import { verifyToken } from "../utils/jwt";
import prisma from "../utils/prisma";
import { myRequest } from '../types';

interface JwtPayload {
    id: number;
    email: string;
}

export const isAuthenticated: RequestHandler = async (expressreq: Request, res: Response, next: NextFunction) => {
    const req = expressreq as myRequest;
    console.log("Cookies:");
    console.log(req.cookies);
    console.log(req.cookies.jwt);
    


    if (!req.cookies || !req.cookies.jwt) {
        console.log("No cookies or JWT token found");
        return res.status(401).json({ message: "No cookies found" });
    }

    const token = req.cookies.jwt;

    try {
        console.log("Decoding token");
      const decoded = verifyToken(token);
      console.log("Decoded token:", decoded);
        
        if (!decoded) {
            console.log(" JWT expired");
            return res.status(401).json({ message: "Invalid JWT token" });
        }
        
        if (typeof decoded === 'string') {
            console.log("Decoded token is a string, which is unexpected");
            return res.sendStatus(403);
        }
        
        const { id } = decoded as JwtPayload;
        console.log("Before querying user in Prisma");
        const user = await prisma.user.findUnique({ where: { id: id } });
      console.log("After querying user in Prisma");
        
        if (!user) {
            console.log("User not found");
            return res.sendStatus(401);
        }

        req.body.user = user;
        console.log("User authenticated, proceeding to next middleware");
        next();
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};