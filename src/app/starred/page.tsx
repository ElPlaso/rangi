import { Inter } from "@next/font/google";
import StarredList from "./components/starred_list";

const inter = Inter({ subsets: ["latin"] });

export default async function StarredPage() {
  return (
    <div className="container">
      <h1 className={inter.className}>Starred Samples</h1>
      <div style={{ marginTop: "1rem" }}>
        <StarredList />
      </div>
    </div>
  );
}