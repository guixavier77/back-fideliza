/*
  Warnings:

  - You are about to alter the column `cnpj` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[cnpj]` on the table `stores` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "stores" ALTER COLUMN "cnpj" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "stores_cnpj_key" ON "stores"("cnpj");
