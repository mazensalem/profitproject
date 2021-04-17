import { FormEvent, useState } from "react";
import hash from "../functions/hash";
import route from "next/router";

export default function login() {
  const [email, Setemail] = useState<string>("");
  const [password, Setpassword] = useState<string>("");
  const [passwordtype, setpasswordtype] = useState<string>("password");
  const [massage, setmassage] = useState<string>("");
  const HandelSubmit = (e: FormEvent) => {
    e.preventDefault();
    let hpassword = hash(password).toString();
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({
        password: hpassword,
        email: email,
      }),
    })
      .then((x) => x.json())
      .then((x) => {
        if (x.found) {
          route.push("/");
        } else {
          setmassage("not found");
        }
      });
  };
  return (
    <form onSubmit={HandelSubmit}>
      <input
        value={email}
        type="email"
        onChange={(e) => Setemail(e.target.value)}
      />
      <input
        value={password}
        type={passwordtype}
        onChange={(e) => Setpassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          passwordtype === "password"
            ? setpasswordtype("text")
            : setpasswordtype("password")
        }
      >
        {passwordtype === "password" ? "show" : "hide"}
      </button>
      <input type="submit" />
      {massage}
    </form>
  );
}
