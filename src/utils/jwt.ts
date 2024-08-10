import { error } from "console";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
const jwtSecret = process.env.SECRET;
export const signToken = (payload: object): string => {
    try {
        if (!jwtSecret) {
            throw error("jwt secret required");
        }
        return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    }
    catch (error) {
        console.error("Error signing token:");
        throw error;
    }
};
export const verifyToken = (token: string) => {
    try {
        if (!jwtSecret) {
            throw error("jwt secret required");
        }

        return jwt.verify(token, jwtSecret);
       

    }
    catch (error) {
        console.log("wrong tokenn", error);
    }
  };