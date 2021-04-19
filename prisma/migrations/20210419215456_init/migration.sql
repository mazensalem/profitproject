-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" INTEGER NOT NULL,
    "jwt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session.userid_unique" ON "Session"("userid");
