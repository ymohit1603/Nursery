-- CreateTable
CREATE TABLE "buyPlant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Price" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "Stock" INTEGER NOT NULL,

    CONSTRAINT "buyPlant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plantOrders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "plantId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plantOrders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plantOrders" ADD CONSTRAINT "plantOrders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantOrders" ADD CONSTRAINT "plantOrders_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "buyPlant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
