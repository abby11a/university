-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "floor" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "updatedAt" DATETIME,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "chipset" TEXT,
    "status" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT NOT NULL,
    "farmId" INTEGER NOT NULL,
    CONSTRAINT "Device_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
