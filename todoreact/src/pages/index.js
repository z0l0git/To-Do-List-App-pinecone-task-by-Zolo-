import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url(/back.jpeg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="m-auto px-[50px] py-[100px]"
    >
      <Layout />
    </div>
  );
}
