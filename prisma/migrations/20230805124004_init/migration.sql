-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,
    "favToArtistId" TEXT,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,
    "favToAlbumId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumid" TEXT,
    "duration" INTEGER NOT NULL,
    "favToTrackId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavToAlbum" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FavToAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavToArtist" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FavToArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavToTrack" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FavToTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Album_artistId_key" ON "Album"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_artistId_key" ON "Track"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumid_key" ON "Track"("albumid");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favToArtistId_fkey" FOREIGN KEY ("favToArtistId") REFERENCES "FavToArtist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favToAlbumId_fkey" FOREIGN KEY ("favToAlbumId") REFERENCES "FavToAlbum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumid_fkey" FOREIGN KEY ("albumid") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favToTrackId_fkey" FOREIGN KEY ("favToTrackId") REFERENCES "FavToTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
