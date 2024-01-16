/*
  Warnings:

  - A unique constraint covering the columns `[mongoId]` on the table `QuizMySQL` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `QuizMySQL_mongoId_key` ON `QuizMySQL`(`mongoId`);
