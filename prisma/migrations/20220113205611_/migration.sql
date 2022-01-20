/*
  Warnings:

  - You are about to drop the column `bio` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the `Writter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `series_id` to the `Comic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comic" DROP CONSTRAINT "Comic_writter_id_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "bio",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comic" ADD COLUMN     "series_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "bio",
ADD COLUMN     "description" TEXT NOT NULL;

-- DropTable
DROP TABLE "Writter";

-- CreateTable
CREATE TABLE "Writer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Writer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_writter_id_fkey" FOREIGN KEY ("writter_id") REFERENCES "Writer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
