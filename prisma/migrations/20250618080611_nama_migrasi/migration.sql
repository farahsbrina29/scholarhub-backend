/*
  Warnings:

  - You are about to drop the column `document` on the `scholarregist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `scholarregist` DROP COLUMN `document`;

-- CreateTable
CREATE TABLE `Workshop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameWorkshop` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Workshop_nameWorkshop_key`(`nameWorkshop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
