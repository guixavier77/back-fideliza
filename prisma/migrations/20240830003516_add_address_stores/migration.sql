-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "address_cep" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "address_city" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "address_neighborhood" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "address_number" VARCHAR(255) DEFAULT '',
ADD COLUMN     "address_street" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "address_uf" VARCHAR(255) NOT NULL DEFAULT '';
