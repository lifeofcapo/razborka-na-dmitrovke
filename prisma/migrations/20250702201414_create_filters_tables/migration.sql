/*
  Warnings:

  - You are about to drop the column `bodyType` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `engineVolume` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `fuelType` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "bodyType",
DROP COLUMN "engineVolume",
DROP COLUMN "fuelType",
ADD COLUMN     "bodyTypeId" INTEGER,
ADD COLUMN     "carPartId" INTEGER,
ADD COLUMN     "engineVolumeId" INTEGER,
ADD COLUMN     "fuelTypeId" INTEGER,
ADD COLUMN     "transmissionId" INTEGER;

-- DropTable
DROP TABLE "categories";

-- DropEnum
DROP TYPE "BodyType";

-- DropEnum
DROP TYPE "FuelType";

-- CreateTable
CREATE TABLE "part_categories" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "part_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_parts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engine_volumes" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "engine_volumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transmission_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transmission_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuel_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuel_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "group" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "body_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "part_categories_slug_key" ON "part_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "car_parts_slug_key" ON "car_parts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "engine_volumes_value_key" ON "engine_volumes"("value");

-- CreateIndex
CREATE UNIQUE INDEX "transmission_types_name_key" ON "transmission_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "transmission_types_slug_key" ON "transmission_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "fuel_types_name_key" ON "fuel_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fuel_types_slug_key" ON "fuel_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "body_types_name_key" ON "body_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "body_types_slug_key" ON "body_types"("slug");

-- AddForeignKey
ALTER TABLE "part_categories" ADD CONSTRAINT "part_categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "part_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_parts" ADD CONSTRAINT "car_parts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "part_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "part_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_carPartId_fkey" FOREIGN KEY ("carPartId") REFERENCES "car_parts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_engineVolumeId_fkey" FOREIGN KEY ("engineVolumeId") REFERENCES "engine_volumes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "fuel_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_bodyTypeId_fkey" FOREIGN KEY ("bodyTypeId") REFERENCES "body_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_transmissionId_fkey" FOREIGN KEY ("transmissionId") REFERENCES "transmission_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
