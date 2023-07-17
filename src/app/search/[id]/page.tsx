import styles from "@/styles/page.module.css";
import SampleResult from "@/components/samples/sample_result";
import Result from "@/types/result";
import {GET as searchAPIGet } from "@/app/api/search/route";

async function getSearchResults(search: string) {
  const searchParams = new URLSearchParams({q: search, num: "15"});
  const request = new Request(`${process.env.URL}/api/search?${searchParams}`);
  return (await searchAPIGet(request)).json();
}
 
export default async function SearchResultsPage({ params }: any) {
  const searchResults = await getSearchResults(decodeURI(params.id));

  return (
    <div className="container">
      <div
        className={styles.description}
        style={{ width: "100%", justifyContent: "end" }}
      >
        <div>
          Showing results for {"'"}
          {decodeURI(params.id)}
          {"'"}
        </div>
      </div>

      <div className={styles.grid} style={{ marginTop: "2rem" }}>
        {searchResults?.map((result: Result) => {
          return <SampleResult key={result.id} result={result} />;
        })}
      </div>
    </div>
  );
}
