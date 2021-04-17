import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let email = JSON.parse(req.body).email;
  let client = new PrismaClient();
  let isFound = await client.user.findFirst({
    where: {
      email,
    },
  });
  if (isFound) {
    res.status(200).json({ isfound: true });
  } else {
    res.status(200).json({ isfound: false });
  }
}
