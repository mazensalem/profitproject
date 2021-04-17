import { ChangeEvent, FormEvent, useState } from "react";
import Hashing from "../functions/hash";
import Checkemail from "../functions/CheckEmail";
import { useReducer } from "react";
import State from "../classes/regstate";
import Action from "../classes/action";
import checkepassword from "../functions/CheckPassword";
import route from "next/router";

enum actions {
  "isemailtaked",
  "isemailvalid",
  "ispasswordvalid",
}

const reducer = (state: State, action: Action) => {
  if (action.type === actions.isemailtaked) {
    if (action.paylode === "true") {
      return { ...state, isemailtaked: true };
    } else {
      return { ...state, isemailtaked: false };
    }
  }
  if (action.type === actions.isemailvalid) {
    if (action.paylode === "true") {
      return { ...state, isemailvalid: true };
    } else {
      return { ...state, isemailvalid: false };
    }
  }

  if (action.type === actions.ispasswordvalid) {
    return { ...state, ispasswordvalid: action.paylode };
  }
  return state;
};
const initstate = {
  isemailtaked: false,
  isemailvalid: false,
  ispasswordvalid: "8 characters minimum",
};
export default function reg() {
  const [state, dispatch] = useReducer(reducer, initstate);
  const [email, setemail] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [passwordtype, setpasswordtype] = useState<string>("password");

  const Submit = (e: FormEvent) => {
    e.preventDefault();
    if (
      state.isemailtaked === false &&
      state.isemailvalid === true &&
      state.ispasswordvalid === "done password"
    ) {
      let hpassword = Hashing(password) as number;
      fetch("/api/reg", {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password: hpassword.toString(),
        }),
      });
      route.push(`/sendmail?email=${email}`);
    } else {
      alert("you must enter valid values");
    }
  };

  const CheckEmail = async (e: ChangeEvent) => {
    let email = (e.target as HTMLFormElement).value;
    setemail(email);
    if (Checkemail(email)) {
      dispatch({ type: actions.isemailvalid, paylode: "true" });
    } else {
      dispatch({ type: actions.isemailvalid, paylode: "false" });
    }
    let data = await fetch("/api/checkemail", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    let json = await data.json();
    if (json.isfound) {
      dispatch({ type: actions.isemailtaked, paylode: "true" });
    } else {
      dispatch({ type: actions.isemailtaked, paylode: "false" });
    }
  };

  const ChangePassword = (e: ChangeEvent) => {
    let password = (e.target as HTMLFormElement).value;
    setpassword(password);
    dispatch({
      type: actions.ispasswordvalid,
      paylode: checkepassword(password),
    });
  };

  return (
    <div>
      <form onSubmit={Submit}>
        <p>
          {state.isemailtaked && "this email is taked before"}
          {state.isemailvalid || "this email is not valid"} <br />
          {state.ispasswordvalid}
        </p>
        <input type="email" value={email} onChange={CheckEmail} />
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input type={passwordtype} value={password} onChange={ChangePassword} />
        <button
          type="button"
          onClick={() => {
            setpasswordtype(passwordtype === "password" ? "word" : "password");
          }}
        >
          {passwordtype === "password" ? "Show password" : "Hide password"}
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
