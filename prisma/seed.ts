import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeders/user';
import { seedBuyPlants } from './seeders/buyPlant';

const prisma = new PrismaClient();

const main = async () => {
  // await seedUsers();
  // await seedBuyPlants();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
