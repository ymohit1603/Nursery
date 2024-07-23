import prisma from "../../src/utils/prisma"


export const seedBuyMedicine = async () => {
    const med = {
        name: "Organic Vermicompost Fertilizer Manure",
        description:`🌱Nutrient-rich: TrustBasket Vermicompost for plants is a nutrient-packed enhancer for your soil, enriched with essential minerals, vitamins, and beneficial microorganisms.
        🌱Eco-friendly: Vermicompost is eco-friendly because it utilizes organic waste, like food scraps and garden debris, reducing landfill waste. Additionally, the process generates nutrient-rich compost without the need for synthetic fertilizers, promoting sustainable agriculture and healthier soil.
        🌱Pure & organic: Our Vermicompost is free from weed seeds, toxic chemicals, harmful pathogens and additives.
        🌱Better plant growth: Vermicompost improves soil structure, aeration, and water retention in your plants fostering robust root development. It also attracts beneficial worms to your garden.
        🌱Disease resistance: The beneficial microbes in our vermicompost help your plants ward off harmful diseases and pests naturally.
        🌱Easy to use: Simply, loosen the topsoil, apply vermicompost near the roots and water the media.
        `,
        Price: 3000.00,
        Stock: 10,
    }

    for (let i = 0; i < 10; i++) {
        await prisma.medicine.create({
            data: {
                name: `${med.name}${i}`,
                description: med.description,
                price: med.Price,
                stock: med.Stock
            }
        })
    }
}