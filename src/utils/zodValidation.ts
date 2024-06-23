import { z } from 'zod';

// User Schema
export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Nursery Schema
export const nurserySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password:z.string().min(8),
  location: z.string().min(1),
  description: z.string().optional(),
});

// Appointment Schema
export const appointmentSchema = z.object({
  userId: z.number().int(),
  nurseryId: z.number().int(),
  date: z.string().transform((str) => new Date(str)), // Converts string to Date object
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
});

// Plant Schema
export const plantSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
});

// Medicine Schema
export const medicineSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
});

// Order Schema
export const orderSchema = z.object({
  userId: z.number().int(),
  medicineId: z.number().int(),
  quantity: z.number().int().positive(),
  status: z.enum(["pending", "completed", "cancelled"]).optional(),
  createdAt: z.string().transform((str) => new Date(str)).optional(), 
});

//cancle appointment schema
export const cancelAppointmentSchema = z.object({
    userId: z.number().int(),
    nurseryId: z.number().int(),
});
  
//order plant schema
export const orderPlant = z.object({
  
  userId: z.number().int(),
  plantId: z.number().int(),
  quantity: z.number().int().positive(),
  status:z.string()
})