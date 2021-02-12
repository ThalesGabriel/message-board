/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[title]` on the table `Post`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post.title_unique" ON "Post"("title");
