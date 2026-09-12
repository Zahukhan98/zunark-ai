-- AlterTable
ALTER TABLE `clients` ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `vatNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `buyerVatNumber` VARCHAR(191) NULL,
    ADD COLUMN `clientId` VARCHAR(191) NULL,
    ADD COLUMN `projectId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `letters` ADD COLUMN `clientId` VARCHAR(191) NULL,
    ADD COLUMN `contractCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `contractCurrency` VARCHAR(191) NULL DEFAULT 'SAR',
    ADD COLUMN `projectDeliveryDate` DATETIME(3) NULL,
    ADD COLUMN `projectStartDate` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `letters` ADD CONSTRAINT `letters_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
