'use client'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './styles/page.module.css'
import SearchBar from './components/search_bar'
import React, { useState } from 'react'
import SamplesLoadingIndicator from './components/samples_loading_indicator'
import Splash from './components/splash'
import SampleResult from './components/sample_result'
import Sample from './models/sample'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [searchResultTitle, setSearchResultTitle] = useState('')

  const [samples, setSamples] = useState([] as any[])

  const [loading, setLoading] = useState(false)

  async function getSamples(search: String) {
    let songID: String = ''
    let song
    let samples: any[] = []


    let headers = new Headers()
    headers.append('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPID_API_KEY as string)
    headers.append('X-RapidAPI-Host', 'genius-song-lyrics1.p.rapidapi.com')

    const options: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    setLoading(true)

    // Get the Song ID of the first search result of the input.
    songID = await fetch('https://genius-song-lyrics1.p.rapidapi.com/search/?q=' + search + '&per_page=1&page=1', options)
      .then(response => response.json())
      .then(data => data['hits']['0']['result']['id'])
      .catch(err => console.error(err));


    // Get the song data
    song = await fetch('https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=' + songID, options)
      .then(response => response.json())
      .then(data => data['song'])
      .catch(err => console.error(err))

    samples = song['song_relationships']['0']['songs']

    let title: string = song['full_title']
    setSearchResultTitle(title)

    setSamples(samples)
    setLoading(false)

    console.log(samples)
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>

        <a
          href="https://github.com/ElPlaso"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/el_plaso.svg"
            alt="Stool El Plaso Logo"
            className={styles.smallerLogo}
            width={100}
            height={24}
            priority
          />
        </a>
        <a
          href="https://docs.genius.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Genius
          </h2>
        </a>
      </div>
      {!loading ?
        <>
          {samples.length > 0 ?
            (
              <>
                <div className={styles.center} style={{ marginTop: '2rem' }}>
                  <h4 className={inter.className}>
                    Samples used in {searchResultTitle}
                  </h4>
                </div>
                <div className={styles.grid} style={{ marginTop: '2rem', marginBottom: '4rem', }}>
                  {samples?.map((sample) => {
                    return <SampleResult
                      key={sample.id}
                      sample={
                        new Sample(
                          sample['title_with_featured'],
                          sample['artist_names'],
                          sample['release_date_components'] ? sample['release_date_components']['year'] : '-',
                          sample['song_art_image_thumbnail_url'],
                        )
                      }
                    />;
                  })}
                </div>
              </>
            )

            :
            <Splash />
          }

          <div>
            <SearchBar getSamples={getSamples} />
          </div>
        </>
        :
        <>
          <div>
            <SamplesLoadingIndicator />
          </div>
          <div>
          </div>
        </>
      }

    </main >
  )
}
