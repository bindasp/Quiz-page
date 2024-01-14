/*
  Warnings:

  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_userId_fkey`;

-- DropForeignKey
ALTER TABLE `QuizCategory` DROP FOREIGN KEY `QuizCategory_quizId_fkey`;

-- DropTable
DROP TABLE `Quiz`;

-- CreateTable
CREATE TABLE `QuizMySQL` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mongoId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuizMySQL` ADD CONSTRAINT `QuizMySQL_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizCategory` ADD CONSTRAINT `QuizCategory_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `QuizMySQL`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
