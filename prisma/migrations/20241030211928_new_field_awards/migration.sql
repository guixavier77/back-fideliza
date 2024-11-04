/*
  Warnings:

  - You are about to drop the column `image_url` on the `awards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "awards" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT;
