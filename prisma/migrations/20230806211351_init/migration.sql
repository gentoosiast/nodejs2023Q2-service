-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumOnFav" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "AlbumOnFav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistOnFav" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "ArtistOnFav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackOnFav" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "TrackOnFav_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Album_artistId_key" ON "Album"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_artistId_key" ON "Track"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumId_key" ON "Track"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumOnFav_albumId_key" ON "AlbumOnFav"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistOnFav_artistId_key" ON "ArtistOnFav"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackOnFav_trackId_key" ON "TrackOnFav"("trackId");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumOnFav" ADD CONSTRAINT "AlbumOnFav_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistOnFav" ADD CONSTRAINT "ArtistOnFav_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackOnFav" ADD CONSTRAINT "TrackOnFav_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
