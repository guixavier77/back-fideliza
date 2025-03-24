-- CreateTable
CREATE TABLE "request_award" (
    "id" SERIAL NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rescued" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "request_award_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "request_award_promotionId_userId_key" ON "request_award"("promotionId", "userId");

-- AddForeignKey
ALTER TABLE "request_award" ADD CONSTRAINT "request_award_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_award" ADD CONSTRAINT "request_award_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
