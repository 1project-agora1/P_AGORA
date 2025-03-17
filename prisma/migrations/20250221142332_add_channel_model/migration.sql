-- CreateTable
CREATE TABLE `channel` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `menu_name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `channel_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel_item` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `parent_menu_token` VARCHAR(191) NOT NULL,
    `parent_submenu_token` VARCHAR(191) NULL,
    `submenu_name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `channel_item_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `channel_item` ADD CONSTRAINT `channel_item_parent_menu_token_fkey` FOREIGN KEY (`parent_menu_token`) REFERENCES `channel`(`token`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel_item` ADD CONSTRAINT `channel_item_parent_submenu_token_fkey` FOREIGN KEY (`parent_submenu_token`) REFERENCES `channel_item`(`token`) ON DELETE SET NULL ON UPDATE CASCADE;
