/*
  Warnings:

  - You are about to drop the column `userId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserCollection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId,collectionId]` on the table `UserCollection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `UserCollection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCollection" DROP CONSTRAINT "UserCollection_userId_fkey";

-- DropIndex
DROP INDEX "Game_userId_key";

-- DropIndex
DROP INDEX "UserCollection_userId_collectionId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserCollection" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_clerkId_key" ON "Game"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCollection_clerkId_collectionId_key" ON "UserCollection"("clerkId", "collectionId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;
