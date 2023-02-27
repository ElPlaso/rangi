import SampleResult from "./components/sample_result"
import { Inter } from '@next/font/google'
import styles from '@/app/styles/page.module.css'
import SearchBar from "@/app/components/search_bar"
import Sample from "@/app/models/sample"

const inter = Inter({ subsets: ['latin'] })

async function getSongData(songID: String) {

  let song: any[]

  let headers = new Headers()
  headers.append('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPID_API_KEY as string)
  headers.append('X-RapidAPI-Host', 'genius-song-lyrics1.p.rapidapi.com')

  const options: RequestInit = {
    method: 'GET',
    headers: headers,
    cache: 'no-store'
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

  const songData: any = await getSongData(params.id)

  if (songData != null) {
    let samples: any[] = songData['song_relationships']['0']['songs']

    let songsThatSampleThisSong : any[] = songData['song_relationships']['1']['songs']

    let title: string = songData['full_title']

    let shortTitle: string = songData['title']

    return (
      <>
        {
          samples.length > 0 ?
            <>
              <p className={inter.className} style={{ marginTop: '2rem' }}>
                Samples used in {title}
              </p>
              <div className={styles.grid} style={{ marginTop: '2rem', marginBottom: '4rem', }}>
                {samples?.map((sample) => {
                  return <SampleResult
                    key={sample.id}
                    sample={
                      new Sample(
                        sample.id,
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
            <p className={inter.className} style={{ marginTop: '2rem' }}>
              No samples found for {title}
            </p>
        }
        {
          songsThatSampleThisSong.length > 0 &&
            <>
              <p className={inter.className} style={{ marginTop: '2rem' }}>
                Songs that sample {shortTitle}
              </p>
              <div className={styles.grid} style={{ marginTop: '2rem', marginBottom: '4rem', }}>
                {songsThatSampleThisSong?.map((song) => {
                  return <SampleResult
                    key={song.id}
                    sample={
                      new Sample(
                        song.id,
                        song['title'],
                        song['artist_names'],
                        song['release_date_components'] ? song['release_date_components']['year'] : '-',
                        song['song_art_image_thumbnail_url'],
                      )
                    }
                  />;
                })}
              </div>
            </>
        }
        <div style={{ marginBottom: '3rem' }}>
          <SearchBar />
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <h4 className={inter.className} style={{ marginTop: '2rem' }} >There was a problem finding samples</h4>
        <div style={{ marginBottom: '4rem' }}>
          <SearchBar />
        </div>
      </>
    )
  }
}