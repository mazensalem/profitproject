import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let client = new PrismaClient();
  let { id }: { id: string } = JSON.parse(req.body);
  let token = await client.forgetPasswordtoken.findFirst({
    where: {
      userid: Number(id),
    },
  });
  if (token) {
    res.status(200).json({ found: true, id: token.id });
  } else {
    res.status(200).json({ found: false });
  }
}
