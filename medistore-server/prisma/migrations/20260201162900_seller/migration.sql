/*
  Warnings:

  - Added the required column `sellerId` to the `Medicines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicines" ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
