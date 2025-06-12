/*
  Warnings:

  - You are about to drop the `scholarregists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scholars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `scholarregists` DROP FOREIGN KEY `ScholarRegists_scholarId_fkey`;

-- DropTable
DROP TABLE `scholarregists`;

-- DropTable
DROP TABLE `scholars`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Scholar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scholarName` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `scholarRequirement` VARCHAR(255) NOT NULL,
    `contact` VARCHAR(255) NOT NULL,
    `startDate` DATETIME(0) NOT NULL,
    `endDate` DATETIME(0) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScholarRegist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `studentId` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `studyProgram` VARCHAR(255) NOT NULL,
    `semester` INTEGER NOT NULL,
    `registDate` DATETIME(0) NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'menunggu persetujuan',
    `note` VARCHAR(255) NULL,
    `document` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `scholarId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScholarRegist` ADD CONSTRAINT `ScholarRegist_scholarId_fkey` FOREIGN KEY (`scholarId`) REFERENCES `Scholar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
