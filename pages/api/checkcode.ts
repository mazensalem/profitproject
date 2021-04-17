import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let { code, email } = JSON.parse(req.body);
  let client = new PrismaClient();
  let user = await client.user.findFirst({
    where: {
      email,
    },
  });
  if (user?.code === code) {
    await client.user.update({
      where: {
        email: email,
      },
      data: {
        ...user,
        isValid: true,
      },
    });
    res.status(200).json({ correct: true });
  } else {
    res.status(200).json({ correct: false });
  }
}
