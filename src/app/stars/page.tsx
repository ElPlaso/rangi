import StarredList from "@/components/stars/starred_list";

export default async function StarredPage() {
  return (
    <div className="container">
      <h1 className="text-3xl font-semibold">Starred Samples</h1>
      <div style={{ marginTop: "1rem" }}>
        <StarredList />
      </div>
    </div>
  );
}
