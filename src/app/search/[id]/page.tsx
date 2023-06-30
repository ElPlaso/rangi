import styles from "@/app/styles/page.module.css";
import SampleResult from "@/app/components/sample_result";

async function getSearchResults(search: String) {
  let results: any[] = [];

  let headers = new Headers();
  headers.append(
    "X-RapidAPI-Key",
    process.env.NEXT_PUBLIC_RAPID_API_KEY as string
  );
  headers.append("X-RapidAPI-Host", "genius-song-lyrics1.p.rapidapi.com");

  const options: RequestInit = {
    method: "GET",
    headers: headers,
    cache: "no-store",
  };

  // Get the Song ID of the first 15 search results of the input.
  results = await fetch(
    "https://genius-song-lyrics1.p.rapidapi.com/search/?q=" +
      search +
      "&per_page=15&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => data["hits"])
    .catch((err) => console.error(err));

  return results;
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
        {searchResults?.map((result) => {
          return (
            <SampleResult
              key={result["result"].id}
              result={{
                id: result["result"].id,
                title: result["result"]["title"],
                artist: result["result"]["artist_names"],
                year: result["result"]["release_date_components"]
                  ? result["result"]["release_date_components"]["year"]
                  : "-",
                imgUrl: result["result"]["song_art_image_thumbnail_url"],
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
