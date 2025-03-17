/*
  Warnings:

  - You are about to drop the column `board_token` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `board` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channel_item_token` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- 1. 먼저 channel_item_token 컬럼을 NULL 허용으로 추가
ALTER TABLE `post`
    ADD COLUMN `channel_item_token` VARCHAR(191) NULL;

-- 2. 데이터 마이그레이션: board_token을 이용해 channel_item_token 값 설정
UPDATE `post` p
    JOIN `board` b ON p.board_token = b.token
    JOIN `channel_item` ci ON b.menu_token = ci.token
SET p.channel_item_token = ci.token;

-- 3. 외래 키 제약조건 해제
ALTER TABLE `board`
    DROP FOREIGN KEY `board_menu_token_fkey`;

-- 4. channel_item_token을 NOT NULL로 변경
ALTER TABLE `post`
    MODIFY COLUMN `channel_item_token` VARCHAR(191) NOT NULL;

-- 5. board_token 컬럼 삭제
ALTER TABLE `post`
    DROP COLUMN `board_token`;

-- 6. board 테이블 삭제
DROP TABLE `board`;

-- 7. 외래 키 추가
ALTER TABLE `post`
    ADD CONSTRAINT `post_channel_item_token_fkey` FOREIGN KEY (`channel_item_token`) REFERENCES `channel_item` (`token`)
        ON DELETE RESTRICT ON UPDATE CASCADE;
