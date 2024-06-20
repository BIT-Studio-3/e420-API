/*
  Warnings:

  - You are about to drop the column `waypointId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_waypointId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "waypointId",
ADD COLUMN     "waypointName" TEXT NOT NULL DEFAULT 'Nama';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_waypointName_fkey" FOREIGN KEY ("waypointName") REFERENCES "Waypoint"("name") ON DELETE CASCADE ON UPDATE CASCADE;
