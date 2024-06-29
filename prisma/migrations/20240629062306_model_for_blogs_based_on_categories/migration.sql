-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('INDOOR', 'OUTDOOR', 'OTHER');

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "categoryType" "CategoryType" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "indoorPlantBlogId" INTEGER,
ADD COLUMN     "otherPlantBlogId" INTEGER,
ADD COLUMN     "outdoorPlantBlogId" INTEGER;

-- CreateTable
CREATE TABLE "IndoorPlantBlog" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "IndoorPlantBlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutdoorPlantBlog" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "OutdoorPlantBlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherPlantBlog" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "OtherPlantBlog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_indoorPlantBlogId_fkey" FOREIGN KEY ("indoorPlantBlogId") REFERENCES "IndoorPlantBlog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_outdoorPlantBlogId_fkey" FOREIGN KEY ("outdoorPlantBlogId") REFERENCES "OutdoorPlantBlog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_otherPlantBlogId_fkey" FOREIGN KEY ("otherPlantBlogId") REFERENCES "OtherPlantBlog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
