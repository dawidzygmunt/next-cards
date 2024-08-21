/*
  Warnings:

  - You are about to drop the column `remainingRepeats` on the `AssignedCard` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AssignedCard` table. All the data in the column will be lost.
  - Added the required column `playerId` to the `AssignedCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeats` to the `AssignedCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssignedCard" DROP CONSTRAINT "AssignedCard_userId_fkey";

-- AlterTable
ALTER TABLE "AssignedCard" DROP COLUMN "remainingRepeats",
DROP COLUMN "userId",
ADD COLUMN     "playerId" TEXT NOT NULL,
ADD COLUMN     "repeats" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "collectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedCard" ADD CONSTRAINT "AssignedCard_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
