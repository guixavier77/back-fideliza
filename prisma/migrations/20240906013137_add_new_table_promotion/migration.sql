-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "currentWinners" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "promotion_winners" (
    "id" SERIAL NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "wonAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "promotion_winners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "promotion_winners_promotionId_userId_key" ON "promotion_winners"("promotionId", "userId");

-- AddForeignKey
ALTER TABLE "promotion_winners" ADD CONSTRAINT "promotion_winners_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_winners" ADD CONSTRAINT "promotion_winners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
