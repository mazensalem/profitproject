-- CreateTable
CREATE TABLE "ForgetPasswordtoken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" INTEGER NOT NULL,
    "useremail" TEXT NOT NULL
);
