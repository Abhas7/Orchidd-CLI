-- Drop the unique constraint on provider and providerAccountId if it exists
DROP INDEX IF EXISTS "account_provider_providerAccountId_key";

-- AlterTable - Make provider and providerAccountId nullable
ALTER TABLE "account" ALTER COLUMN "provider" DROP NOT NULL;
ALTER TABLE "account" ALTER COLUMN "providerAccountId" DROP NOT NULL;
