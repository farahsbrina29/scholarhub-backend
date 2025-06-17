/*
  Warnings:

  - You are about to alter the column `status` on the `scholarregist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `scholarregist` MODIFY `registDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `status` ENUM('waiting_for_result', 'rejected', 'accepted') NOT NULL DEFAULT 'waiting_for_result';
