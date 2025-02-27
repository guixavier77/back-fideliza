-- CreateTable
CREATE TABLE "reset_password_token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "reset_password_token_pkey" PRIMARY KEY ("id")
);
