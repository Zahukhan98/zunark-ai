-- AlterTable
ALTER TABLE `letters` ADD COLUMN `projectId` VARCHAR(191) NULL,
    ADD COLUMN `type` ENUM('GENERAL', 'CONTRACT') NOT NULL DEFAULT 'GENERAL';

-- AddForeignKey
ALTER TABLE `letters` ADD CONSTRAINT `letters_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
