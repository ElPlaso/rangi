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

  async function getSamples(songID: String) {
    let song
    let samples: any[] = []

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

    samples = song['song_relationships']['0']['songs']

    let title: string = song['full_title']
    setSearchResultTitle(title)

    setSamples(samples)

    console.log(samples)
  }

  return (
    <>
      {
        samples.length > 0 ?
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
                        sample['title'],
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

          : <Splash />
      }
      <div>
        <SearchBar />
      </div>
    </>
  )
}
