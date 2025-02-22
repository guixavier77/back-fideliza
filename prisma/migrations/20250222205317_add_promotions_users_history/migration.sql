-- AlterTable
ALTER TABLE "promotions_users_history" ALTER COLUMN "operatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "promotions_users_history" ADD CONSTRAINT "promotions_users_history_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
