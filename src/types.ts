import { Request, Response } from 'express';
import { User } from '@prisma/client'; // Adjust the import based on your User model path

export interface myRequest extends Request {
  user: User;
}

