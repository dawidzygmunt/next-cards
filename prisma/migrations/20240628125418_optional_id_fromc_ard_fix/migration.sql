/*
  Warnings:

  - Made the column `collectionId` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_collectionId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "collectionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
