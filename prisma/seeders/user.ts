import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedUsers = async () => {
    const users = [
        {
            email: 'john.doe@example.com',
            password: 'password123',
        },
        {
            email: 'jane.doe@example.com',
            password: 'password123',
        },
    ];

    for (const user of users) {
        await prisma.user.create({
            data: user,
        });
    }
};