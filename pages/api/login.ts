import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

let Key = "hgdfjklssbhdfwehrgurfedwosdkijfhg";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  let client = new PrismaClient();
  let { email, password }: { email: string; password: string } = JSON.parse(
    req.body
  );
  let user = await client.user.findFirst({
    where: {
      email,
      password,
    },
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        isvalid: user.isValid,
        email: user.email,
        name: user.username,
      },
      Key
    );
    await client.session.create({
      data: {
        userid: user.id,
        jwt: token,
      },
    });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 * 3,
        httpOnly: true,
      })
    );
    res.status(200).json({ found: true });
  } else {
    res.status(200).json({ found: false });
  }
}
