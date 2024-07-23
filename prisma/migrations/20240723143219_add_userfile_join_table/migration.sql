/*
  Warnings:

  - You are about to drop the `_UserFiles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_UserFiles" DROP CONSTRAINT "_UserFiles_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFiles" DROP CONSTRAINT "_UserFiles_B_fkey";

-- DropTable
DROP TABLE "_UserFiles";

-- CreateTable
CREATE TABLE "UserFile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserFile_fileId_idx" ON "UserFile"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFile_userId_fileId_key" ON "UserFile"("userId", "fileId");

-- CreateIndex
CREATE UNIQUE INDEX "File_url_key" ON "File"("url");

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFile" ADD CONSTRAINT "UserFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
