-- CreateEnum
CREATE TYPE "SystemType" AS ENUM ('RED_STAR', 'YOUNG_STAR', 'UNSTABLE', 'NEUTRON_STAR', 'ORANGE_STAR', 'BLUE_STAR', 'WHITE_DWARF', 'NEBULA');

-- CreateEnum
CREATE TYPE "WaypointType" AS ENUM ('PLANET', 'MOON', 'ASTEROID', 'GAS_GIANT');

-- CreateEnum
CREATE TYPE "Trait" AS ENUM ('UNCHARTED', 'MARKETPLACE', 'SHIPYARD', 'OUTPOST', 'OCEAN', 'BARREN', 'FROZEN', 'SPRAWLING_CITIES');

-- CreateTable
CREATE TABLE "System" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SystemType" NOT NULL,

    CONSTRAINT "System_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waypoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WaypointType" NOT NULL,
    "traits" "Trait"[],
    "systemId" INTEGER NOT NULL,

    CONSTRAINT "Waypoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "shipCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipyard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "waypointId" INTEGER NOT NULL,

    CONSTRAINT "Shipyard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT,
    "shipyardId" INTEGER,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "System_name_key" ON "System"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Waypoint_name_key" ON "Waypoint"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Shipyard_name_key" ON "Shipyard"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Shipyard_waypointId_key" ON "Shipyard"("waypointId");

-- CreateIndex
CREATE UNIQUE INDEX "Ship_name_key" ON "Ship"("name");

-- AddForeignKey
ALTER TABLE "Waypoint" ADD CONSTRAINT "Waypoint_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipyard" ADD CONSTRAINT "Shipyard_waypointId_fkey" FOREIGN KEY ("waypointId") REFERENCES "Waypoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_shipyardId_fkey" FOREIGN KEY ("shipyardId") REFERENCES "Shipyard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
