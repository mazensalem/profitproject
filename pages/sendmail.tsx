import { useState } from "react";
import route from "next/router";

async function SendEmail(email: string) {
  await fetch("http://localhost:3000/api/sendemail", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function getServerSideProps(context: any) {
  const { email } = context.req.__NEXT_INIT_QUERY;
  await SendEmail(email);
  return {
    props: context.req.__NEXT_INIT_QUERY,
  };
}

interface Props {
  email: string;
}

export default function sendmail({ email }: Props) {
  const [usercode, setUsercode] = useState<string>("");
  const HandelSumbit = () => {
    fetch("http://localhost:3000/api/checkcode", {
      method: "POST",
      body: JSON.stringify({
        code: Number(usercode),
        email,
      }),
    })
      .then((x) => x.json())
      .then((x) => {
        if (x.correct) {
          route.push("/login")
        } else {
          alert("this is not correct");
        }
      });
  };
  return (
    <>
      we sent the code to {email}
      <input
        type="number"
        value={usercode}
        onChange={(e) => setUsercode(e.target.value)}
      />
      <button onClick={HandelSumbit}>check</button>
      <button onClick={() => SendEmail(email)}>resent</button>
    </>
  );
}
