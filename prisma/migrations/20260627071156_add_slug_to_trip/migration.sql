/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Trip_slug_key" ON "Trip"("slug");
