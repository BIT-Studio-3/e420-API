-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('PROCUREMENT', 'TRANSPORT', 'SHUTTLE');

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "type" "ContractType" NOT NULL,
    "destinationSymbol" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "fulfilled" BOOLEAN NOT NULL DEFAULT false,
    "deadlineToAccept" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractTerms" (
    "id" SERIAL NOT NULL,
    "deadline" TEXT NOT NULL,
    "payment" INTEGER NOT NULL,
    "cargo" TEXT NOT NULL,
    "contractId" INTEGER NOT NULL,

    CONSTRAINT "ContractTerms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_destinationSymbol_fkey" FOREIGN KEY ("destinationSymbol") REFERENCES "Waypoint"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractTerms" ADD CONSTRAINT "ContractTerms_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
