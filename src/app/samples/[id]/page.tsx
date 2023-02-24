import SampleResult from "./components/sample_result"
import { Inter } from '@next/font/google'
import styles from '@/app/styles/page.module.css'
import SearchBar from "@/app/components/search_bar"
import Sample from "@/app/models/sample"
import Home from "@/app/page"

const inter = Inter({ subsets: ['latin'] })

async function getSongData(songID: String) {

  let song: any[]

  let headers = new Headers()
  headers.append('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPID_API_KEY as string)
  headers.append('X-RapidAPI-Host', 'genius-song-lyrics1.p.rapidapi.com')

  const options: RequestInit = {
    method: 'GET',
    headers: headers,
  };

  // Get the song data
  song = await fetch('https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=' + songID, options)
    .then(response => response.json())
    .then(data => data['song'])
    .catch(err => console.error(err))

  // samples = song['song_relationships']['0']['songs']

  // title: string = song['full_title']

  return song
}

export default async function SampleResultsPage({ params }: any) {
  try {

    const songData: any = await getSongData(params.id)

    let samples: any[] = songData['song_relationships']['0']['songs']

    let title: string = songData['full_title']

    return (
      <>
        {
          samples.length > 0 ?
            <>
              <div className={styles.center} style={{ marginTop: '2rem' }}>
                <h4 className={inter.className}>
                  Samples used in {title}
                </h4>
              </div>
              <div className={styles.grid} style={{ marginTop: '2rem', marginBottom: '4rem', }}>
                {samples?.map((sample) => {
                  return <SampleResult
                    key={sample.id}
                    sample={
                      new Sample(
                        sample['title'],
                        sample['artist_names'],
                        sample['release_date_components'] ? sample['release_date_components']['year'] : '-',
                        sample['song_art_image_thumbnail_url'],
                      )
                    }
                  />;
                })}
              </div>
            </> :
            <div className={styles.center} style={{ marginTop: '2rem' }}>
              <h4 className={inter.className}>
                No samples found for {title}
              </h4>
            </div>
        }

        <div>
          <SearchBar />
        </div>
      </>
    )
  }
  catch (e) {
    console.log(e)
    return (
      <Home />
    )
  }

}