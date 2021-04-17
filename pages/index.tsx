import cookie from "cookie";
import jwt from "jsonwebtoken";
export default function Home() {
  const LogoutHandler = () => {
    console.log(cookie.parse(""));
  };
  return (
    <h1>
      Hello world
      <button onClick={LogoutHandler}>log out</button>
    </h1>
  );
}
