import prisma from '../../src/utils/prisma';

export const seedUsers = async () => {
    const users = [
        {
            email: 'joh1n.doe@example.com',
            password: 'password123',
        },
        {
            email: 'ja2ne.doe@example.com',
            password: 'password123',
        },
    ];

    for (const user of users) {
        await prisma.user.create({
            data: user,
        });
    }
};