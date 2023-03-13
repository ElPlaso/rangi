import SearchResult from "../../components/search_result";
import { Inter } from "@next/font/google";
import styles from "@/app/styles/page.module.css";
import Result from "@/app/models/result";
import SearchBar from "@/app/components/search_bar";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
    <>
      <div className={styles.description}>
        <p>
          <Link href="/">
            <Image
              className={styles.logo}
              src="/samplify.svg"
              alt="Samplify X Logo"
              width={150}
              height={20}
              priority
            />
          </Link>
        </p>
        <div>
          Showing results for {"'"}
          {decodeURI(params.id)}
          {"'"}
        </div>
      </div>

      <div
        className={styles.grid}
        style={{ marginTop: "2rem", marginBottom: "4rem" }}
      >
        {searchResults?.map((result) => {
          return (
            <SearchResult
              type={"samples"}
              key={result["result"].id}
              result={
                new Result(
                  result["result"].id,
                  result["result"]["title"],
                  result["result"]["artist_names"],
                  result["result"]["release_date_components"]
                    ? result["result"]["release_date_components"]["year"]
                    : "-",
                  result["result"]["song_art_image_thumbnail_url"]
                )
              }
            />
          );
        })}
      </div>
      <div style={{ marginBottom: "3rem" }}>
        <SearchBar />
      </div>
    </>
  );
}
