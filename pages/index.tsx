import cookie from "cookies";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import router from "next/router";
import { PrismaClient } from "@prisma/client";

interface parmas1 {
  req: NextApiRequest;
  res: NextApiResponse;
}
interface Props {
  token: string;
}

export default function Home({ token }: Props) {
  if (token === "you don't have the primation to this page") {
    return <> {token} </>;
  }
  let user = jwt.decode(token);
  user = user as { [key: string]: string };
  const Logout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      body: JSON.stringify({ userid: (user as { [key: string]: string }).id }),
      method: "POST",
    });
    router.push("/login");
  };
  return (
    <>
      <h1>{token ? `hi, ${user.name}` : "you can log in"}</h1>
      <button onClick={Logout}>log out</button>
    </>
  );
}

export async function getServerSideProps({ req, res }: parmas1) {
  let Cookie = new cookie(req, res);
  const token = Cookie.get("token");
  const client = new PrismaClient();
  const session = await client.session.findFirst({
    where: {
      userid: (jwt.decode(token as string) as { id: number }).id,
    },
  });
  if (session) {
    return {
      props: {
        token: token || "",
      },
    };
  } else {
    return {
      props: {
        token: "you don't have the primation to this page",
      },
    };
  }
}
