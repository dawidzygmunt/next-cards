/*
  Warnings:

  - Made the column `name` on table `Player` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "role" SET NOT NULL;
