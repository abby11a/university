/*
  Warnings:

  - The primary key for the `Device` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Device` table. All the data in the column will be lost.
  - Added the required column `Id` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Device` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `Id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Id`);
