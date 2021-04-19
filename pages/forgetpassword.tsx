import { FormEvent, useState } from "react";

export default function forgetpassword() {
  const [email, setEmail] = useState<string>("");
  const [massage, setMassage] = useState<string>("");
  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let Result = await fetch("http://localhost:3000/api/forgetpassword", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    let result = await Result.json();
    if (result.massage === "not found") {
      setMassage("we can't find your account you can create one");
    } else {
      setMassage("we send an email to you");
    }
  };
  return (
    <div>
      {massage}
      <form onSubmit={HandleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
