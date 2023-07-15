import StarredList from "./components/starred_list";

export default async function StarredPage() {
  return (
    <div className="container">
      <h1>Starred Samples</h1>
      <div style={{ marginTop: "1rem" }}>
        <StarredList />
      </div>
    </div>
  );
}