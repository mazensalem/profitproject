import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function (req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "JWT", {
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30 * 3,
      httpOnly: true,
    })
  );
  res.status(200).json({});
}
