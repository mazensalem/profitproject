import { FormEvent, useState } from "react";

export default function reg() {
  const [email, setemail] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const Submit = (e: FormEvent) => {
    e.preventDefault();
    console.log();
    fetch("/api/reg", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    });
  };
  return (
    <div>
      <form onSubmit={Submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
