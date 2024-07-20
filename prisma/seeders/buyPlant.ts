import prisma from "../../src/utils/prisma";

export const seedBuyPlants = async () => {
    const plants = {
        name: "Cactus",
        category: "Outdoor",
        Price: 3000,
        Stock: 10,
    }

    for (let i = 0; i < 10; i++) {
        await prisma.buyPlant.create({
            data: {
                name: `${plants.name}${i}`,
                category: plants.category,
                Price: plants.Price,
                Stock: plants.Stock
            }
        })
    }
};
