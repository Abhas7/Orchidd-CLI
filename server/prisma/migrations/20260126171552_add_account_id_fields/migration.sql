-- AlterTable
ALTER TABLE "account" ADD COLUMN "accountId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "account" ADD COLUMN "providerId" TEXT NOT NULL DEFAULT '';

-- Populate the new fields from existing data
UPDATE "account" SET "accountId" = "providerAccountId", "providerId" = "provider";

-- Make the fields non-nullable (remove default)
ALTER TABLE "account" ALTER COLUMN "accountId" DROP DEFAULT;
ALTER TABLE "account" ALTER COLUMN "providerId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "account_providerId_accountId_key" ON "account"("providerId", "accountId");
