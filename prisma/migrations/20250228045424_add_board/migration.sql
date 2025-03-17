/*
  Warnings:

  - A unique constraint covering the columns `[board_token]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `board_token` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `board_token` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `board` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `menu_token` VARCHAR(191) NOT NULL,
    `board_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `board_token_key`(`token`),
    UNIQUE INDEX `board_menu_token_key`(`menu_token`),
    UNIQUE INDEX `board_board_name_key`(`board_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `post_board_token_key` ON `post`(`board_token`);

-- AddForeignKey
ALTER TABLE `board` ADD CONSTRAINT `board_menu_token_fkey` FOREIGN KEY (`menu_token`) REFERENCES `channel_item`(`token`) ON DELETE RESTRICT ON UPDATE CASCADE;
