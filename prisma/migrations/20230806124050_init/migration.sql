/*
  Warnings:

  - You are about to drop the column `albumid` on the `Track` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[albumId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumid_fkey";

-- DropIndex
DROP INDEX "Track_albumid_key";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "albumid",
ADD COLUMN     "albumId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "version" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumId_key" ON "Track"("albumId");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
