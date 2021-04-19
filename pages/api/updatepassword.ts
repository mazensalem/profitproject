import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const client = new PrismaClient();
  const { id, tokenid, password } = JSON.parse(req.body);
  const user = await client.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  await client.user.update({
    where: { id: Number(id) },
    data: { ...user, password: password },
  });
  await client.forgetPasswordtoken.delete({
    where: {
      id: Number(tokenid),
    },
  });
  res.status(200).json({});
  //   const user = await client.user.findUnique({
  //     where: {
  //       id: userid,
  //     },
  //   });
  //   if (!user) {
  //     res.status(200).json({ massage: "not found" });
  //     return;
  //   }

  //   await client.forgetPasswordtoken.create({
  //     data: {
  //       useremail: email,
  //       userid: user.id,
  //     },
  //   });

  //   let transport = createTransport({
  //     service: "hotmail",
  //     auth: {
  //       user: "mazensalem1@outlook.com",
  //       pass: "Photoshop7@",
  //     },
  //   });
  //   let options = {
  //     from: "mazensalem1@outlook.com",
  //     to: email,
  //     subject: "reset password",
  //     text: `go to        http://localhost:3000/resetpassword?id=${user.id}`,
  //   };
  //   transport.sendMail(options, () => {});
  //   res.status(200).json({ massage: "found" });
}
