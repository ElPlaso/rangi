'use client'

import { Inter } from '@next/font/google'
import styles from './styles/page.module.css'
import SearchBar from './components/search_bar'
import React, { useState } from 'react'
import Splash from './components/splash'
import SampleResult from './samples/[id]/components/sample_result'
import Sample from './models/sample'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [searchResultTitle, setSearchResultTitle] = useState('')

  const [samples, setSamples] = useState([] as any[])

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
