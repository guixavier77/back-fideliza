/*
  Warnings:

  - You are about to alter the column `name` on the `awards` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `image_url` on the `awards` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `promotions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cpf` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `action` on the `users_history` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `cnpj` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "awards" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "image_url" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "promotions" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "rewards" ALTER COLUMN "delivered" SET DEFAULT false;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "cnpj" TEXT NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "users_history" ALTER COLUMN "action" SET DATA TYPE VARCHAR(255);
