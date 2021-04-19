import { FormEvent, useState } from "react";
import Hash from "../functions/hash";
import router from "next/router";
import ispasswordcorrect from "../functions/CheckPassword";
import { GetServerSidePropsContext } from "next";

export default function resetpassword({ isfound, id, userid }: any) {
  const [password1type, setpassword1type] = useState<string>("password");
  const [password2type, setpassword2type] = useState<string>("password");
  const [massage, setmassage] = useState<string>("");
  const [password1, setpassword1] = useState<string>("");
  const [password2, setpassword2] = useState<string>("");
  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password1 !== password2) {
      setmassage("the password is not match");
      return;
    } else if (ispasswordcorrect(password1) !== "done password") {
      setmassage(ispasswordcorrect(password1));
      return;
    }
    await fetch("http://localhost:3000/api/updatepassword", {
      method: "POST",
      body: JSON.stringify({
        tokenid: id,
        id: userid,
        password: Hash(password1).toString(),
      }),
    });
    router.push("/login");
  };
  return isfound ? (
    <div>
      {massage}
      <form onSubmit={HandleSubmit}>
        <input
          type={password1type}
          value={password1}
          onChange={(e) => {
            setpassword1(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setpassword1type(
              password1type === "password" ? "text" : "password"
            );
          }}
          type="button"
        >
          {password1type === "password" ? "show" : "hide"}
        </button>
        <input
          type={password2type}
          value={password2}
          onChange={(e) => {
            setpassword2(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setpassword2type(
              password2type === "password" ? "text" : "password"
            );
          }}
          type="button"
        >
          {password2type === "password" ? "show" : "hide"}
        </button>
        <input type="submit" />
      </form>
    </div>
  ) : (
    "this is not a vaild url"
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let rdata = await fetch("http://localhost:3000/api/checkid", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
  });
  let data = await rdata.json();
  if (!data.found) {
    return {
      props: {
        isfound: false,
      },
    };
  }
  return {
    props: {
      isfound: true,
      userid: id,
      id: data.id,
    },
  };
}
