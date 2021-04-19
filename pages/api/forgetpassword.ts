import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const client = new PrismaClient();
  const email = JSON.parse(req.body).email;
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(200).json({ massage: "not found" });
    return;
  }

  await client.forgetPasswordtoken.create({
    data: {
      useremail: email,
      userid: user.id,
    },
  });

  let transport = createTransport({
    service: "hotmail",
    auth: {
      user: "mazensalem1@outlook.com",
      pass: "Photoshop7@",
    },
  });
  let options = {
    from: "mazensalem1@outlook.com",
    to: email,
    subject: "reset password",
    text: `go to        http://localhost:3000/resetpassword?id=${user.id}`,
  };
  transport.sendMail(options, () => {});
  res.status(200).json({ massage: "found" });
}
