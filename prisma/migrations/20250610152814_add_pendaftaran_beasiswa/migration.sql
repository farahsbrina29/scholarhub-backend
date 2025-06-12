-- CreateTable
CREATE TABLE `PendaftaranBeasiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `nim` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `program_studi` VARCHAR(255) NOT NULL,
    `semester` INTEGER NOT NULL,
    `tanggal_pendaftaran` DATETIME(0) NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'menunggu persetujuan',
    `catatan_admin` VARCHAR(255) NULL,
    `dokumen` VARCHAR(255) NOT NULL,
    `scholarId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PendaftaranBeasiswa` ADD CONSTRAINT `PendaftaranBeasiswa_scholarId_fkey` FOREIGN KEY (`scholarId`) REFERENCES `Scholar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
