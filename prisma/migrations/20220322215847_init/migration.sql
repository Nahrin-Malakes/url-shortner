/*
  Warnings:

  - You are about to drop the column `link` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `short_link` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_url]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `short_url` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Url_short_link_key";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "link",
DROP COLUMN "short_link",
ADD COLUMN     "short_url" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_short_url_key" ON "Url"("short_url");
