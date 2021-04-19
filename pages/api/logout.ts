import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const client = new PrismaClient();
  const { userid } = JSON.parse(req.body);
  await client.session.delete({
    where: {
      userid,
    },
  });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
      httpOnly: true,
    })
  );
  res.status(200).json({ word: "hello" });
}
