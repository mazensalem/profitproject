import cookie from "cookies";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import router from "next/router";

interface parmas1 {
  req: NextApiRequest;
  res: NextApiResponse;
}
interface Props {
  token: string;
}

export default function Home({ token }: Props) {
  let user = jwt.decode(token);
  user = user as { [key: string]: string };
  const Logout = async () => {
    await fetch("http://localhost:3000/api/logout");
    router.push("/login");
  };
  return (
    <h1>
      {token ? `hi, ${user.name}` : "you can log in"}
      <button onClick={Logout}>log out</button>
    </h1>
  );
}

export function getServerSideProps({ req, res }: parmas1) {
  let Cookie = new cookie(req, res);
  const token = Cookie.get("token");
  return {
    props: {
      token: token || "",
    },
  };
}
