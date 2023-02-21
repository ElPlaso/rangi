import SearchResult from "./components/search_result"
import { Inter } from '@next/font/google'
import styles from '@/app/styles/page.module.css'
import Result from "@/app/models/result"
import SearchBar from "@/app/components/search_bar"
import Home from "@/app/page"

const inter = Inter({ subsets: ['latin'] })

async function getSearchResults(search: String) {
  let results: any[] = []

  let headers = new Headers()
  headers.append('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPID_API_KEY as string)
  headers.append('X-RapidAPI-Host', 'genius-song-lyrics1.p.rapidapi.com')

  const options: RequestInit = {
    method: 'GET',
    headers: headers,
  };

  // Get the Song ID of the first search result of the input.
  results = await fetch('https://genius-song-lyrics1.p.rapidapi.com/search/?q=' + search + '&per_page=9&page=1', options)
    .then(response => response.json())
    .then(data => data['hits'])
    .catch(err => console.error(err))

  return results
}

export default async function SearchResultsPage({ params }: any) {
  try {

    const searchResults = await getSearchResults(params.id)

    return (
      <>
        <div className={styles.center} style={{ marginTop: '2rem' }}>
          <h4 className={inter.className}>
            Showing results for {params.id}
          </h4>
        </div>
        <div className={styles.grid} style={{ marginTop: '2rem', marginBottom: '4rem', }}>
          {searchResults?.map((result) => {
            return <SearchResult
              key={result['result'].id}
              result={
                new Result(
                  result['result'].id,
                  result['result']['title'],
                  result['result']['artist_names'],
                  result['result']['release_date_components'] ? result['result']['release_date_components']['year'] : '-',
                  result['result']['song_art_image_thumbnail_url'],
                )
              }
            />;
          })}
        </div>
        <div>
          <SearchBar />
        </div>
      </>
    )
  }
  catch (e) {
    return <Home />
  }
}