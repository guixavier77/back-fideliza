/*
  Warnings:

  - You are about to drop the column `wonAt` on the `promotion_winners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "promotion_winners" DROP COLUMN "wonAt",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);
