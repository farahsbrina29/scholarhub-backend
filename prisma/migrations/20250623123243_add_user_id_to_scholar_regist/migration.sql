/*
  Warnings:

  - Added the required column `userId` to the `ScholarRegist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `scholarregist` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ScholarRegist` ADD CONSTRAINT `ScholarRegist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
