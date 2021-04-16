import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <button
      onClick={() => {
        fetch("/api/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }}
    >
      click
    </button>
  </Layout>
);

export default IndexPage;
