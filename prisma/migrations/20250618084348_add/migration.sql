/*
  Warnings:

  - Added the required column `linkWorkshop` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workshop` ADD COLUMN `linkWorkshop` VARCHAR(191) NOT NULL;
