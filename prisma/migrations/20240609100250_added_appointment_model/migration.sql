/*
  Warnings:

  - You are about to drop the column `email` on the `Nursery` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Nursery` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - Added the required column `nurseryId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Nursery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Nursery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Nursery` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Nursery_email_key";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "nurseryId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Nursery" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_nurseryId_fkey" FOREIGN KEY ("nurseryId") REFERENCES "Nursery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
