/*
  Warnings:

  - You are about to drop the column `content` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Device` table. All the data in the column will be lost.
  - Added the required column `Make` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Model` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Device` DROP COLUMN `content`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `published`,
    DROP COLUMN `title`,
    DROP COLUMN `viewCount`,
    ADD COLUMN `Availability` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `Chipset` VARCHAR(191) NULL,
    ADD COLUMN `Make` VARCHAR(191) NOT NULL,
    ADD COLUMN `Model` VARCHAR(191) NOT NULL,
    ADD COLUMN `Status` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;
