/*
  Warnings:

  - Added the required column `url` to the `SavedArticle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedArticle" ADD COLUMN     "url" TEXT NOT NULL;
