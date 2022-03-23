-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "short_link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_short_link_key" ON "Url"("short_link");
