/*
  Warnings:

  - You are about to drop the column `clerkId` on the `Player` table. All the data in the column will be lost.
  - Made the column `clerkId` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_clerkId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_clerkId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "clerkId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "clerkId";

-- CreateTable
CREATE TABLE "AssignedCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "remainingRepeats" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AssignedCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedCard" ADD CONSTRAINT "AssignedCard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedCard" ADD CONSTRAINT "AssignedCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedCard" ADD CONSTRAINT "AssignedCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
