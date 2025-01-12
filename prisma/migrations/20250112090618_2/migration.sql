/*
  Warnings:

  - The primary key for the `Album` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `artistId` column on the `Album` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Artist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Track` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `artistId` column on the `Track` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `albumId` column on the `Track` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `Album` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Artist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Track` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_AlbumToFavorites` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_ArtistToFavorites` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_FavoritesToTrack` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_artistId_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToFavorites" DROP CONSTRAINT "_AlbumToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToTrack" DROP CONSTRAINT "_FavoritesToTrack_B_fkey";

-- AlterTable
ALTER TABLE "Album" DROP CONSTRAINT "Album_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "artistId",
ADD COLUMN     "artistId" UUID,
ADD CONSTRAINT "Album_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Artist_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Track" DROP CONSTRAINT "Track_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "artistId",
ADD COLUMN     "artistId" UUID,
DROP COLUMN "albumId",
ADD COLUMN     "albumId" UUID,
ADD CONSTRAINT "Track_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_AlbumToFavorites" DROP COLUMN "A",
ADD COLUMN     "A" UUID NOT NULL;

-- AlterTable
ALTER TABLE "_ArtistToFavorites" DROP COLUMN "A",
ADD COLUMN     "A" UUID NOT NULL;

-- AlterTable
ALTER TABLE "_FavoritesToTrack" DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_id_key" ON "Favorites"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Track_id_key" ON "Track"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToFavorites_AB_unique" ON "_AlbumToFavorites"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToFavorites_AB_unique" ON "_ArtistToFavorites"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToTrack_AB_unique" ON "_FavoritesToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToTrack_B_index" ON "_FavoritesToTrack"("B");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavorites" ADD CONSTRAINT "_ArtistToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFavorites" ADD CONSTRAINT "_AlbumToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToTrack" ADD CONSTRAINT "_FavoritesToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
