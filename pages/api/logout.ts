import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function (req: NextApiRequest, res: NextApiResponse) {
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
