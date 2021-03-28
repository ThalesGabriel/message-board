/*
  Warnings:

  - You are about to drop the column `fileId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `avatarId` on the `User` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[file]` on the table `Media`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[user]` on the table `RefreshToken`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[avatar]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "RefreshToken_userId_unique";

-- DropIndex
DROP INDEX "User_avatarId_unique";

-- DropIndex
DROP INDEX "Media_fileId_unique";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "fileId",
ADD COLUMN     "file" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
ADD COLUMN     "author" INTEGER;

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "userId",
ADD COLUMN     "user" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarId",
ADD COLUMN     "avatar" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Media_file_unique" ON "Media"("file");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_user_unique" ON "RefreshToken"("user");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatar_unique" ON "User"("avatar");

-- AddForeignKey
ALTER TABLE "Media" ADD FOREIGN KEY ("file") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("avatar") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
