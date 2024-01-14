/*
  Warnings:

  - Added the required column `mongoId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quiz` ADD COLUMN `mongoId` VARCHAR(191) NOT NULL;
