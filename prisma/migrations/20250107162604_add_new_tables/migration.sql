-- CreateTable
CREATE TABLE "promotions_users_history" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "operatorId" INTEGER NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "promotions_users_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_code" (
    "id" SERIAL NOT NULL,
    "promotionId" INTEGER NOT NULL,

    CONSTRAINT "qr_code_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "promotions_users_history" ADD CONSTRAINT "promotions_users_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions_users_history" ADD CONSTRAINT "promotions_users_history_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
