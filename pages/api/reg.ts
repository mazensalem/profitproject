import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    let client = new PrismaClient();
    await client.user.create({
      data: { ...JSON.parse(req.body), isValid: false, code: 0 },
    });
    res.status(200).json({});
  }
}
