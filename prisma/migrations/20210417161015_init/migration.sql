/*
  Warnings:

  - Added the required column `isValid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "code" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id", "email", "password", "username") SELECT "id", "email", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
