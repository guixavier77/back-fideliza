/*
  Warnings:

  - A unique constraint covering the columns `[userId,promotionId]` on the table `promotions_users_point` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "promotions_users_point_userId_promotionId_key" ON "promotions_users_point"("userId", "promotionId");
