/*
  Warnings:

  - You are about to drop the column `endDate` on the `workshop` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `workshop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `workshop` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`;
