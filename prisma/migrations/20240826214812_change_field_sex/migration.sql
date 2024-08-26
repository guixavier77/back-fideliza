/*
  Warnings:

  - You are about to drop the column `sexo` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "sexo",
ADD COLUMN     "sex" TEXT NOT NULL DEFAULT 'm';
