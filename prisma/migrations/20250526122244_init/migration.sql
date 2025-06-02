-- CreateTable
CREATE TABLE `Scholar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_beasiswa` VARCHAR(255) NOT NULL,
    `kategori` VARCHAR(255) NOT NULL,
    `deskripsi` VARCHAR(255) NOT NULL,
    `persyaratan_beasiswa` VARCHAR(255) NOT NULL,
    `kontak` VARCHAR(255) NOT NULL,
    `tanggal_mulai` DATETIME(0) NOT NULL,
    `tanggal_akhir` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
