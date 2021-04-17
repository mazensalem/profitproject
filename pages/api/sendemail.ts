import { createTransport } from "nodemailer";
import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let email = JSON.parse(req.body).email;
  let clinet = new PrismaClient();
  let User = await clinet.user.findFirst({
    where: {
      email: email,
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
    subject: "the code",
    text: (User as { code: number }).code.toString(),
  };
  transport.sendMail(options, () => {});
  res.json({});
}
