'use client'

import Splash from './components/splash'
import React, { useState, useEffect } from 'react'
import styles from './styles/page.module.css'
import './styles/searchbar.css'
import SearchResult from './search/[id]/components/search_result'
import Result from './models/result'

export default function Home() {
  const [searchResults, setSearchResults] = useState([] as any[])

  const [input, setInput] = useState("")

  const handleInput = (e: any) => {
    setInput(e.target.value)
  }

  useEffect(()=>{
    let cancel = false

    if(input.trim().length == 0){
      setSearchResults([])
    }
    else {
      let headers = new Headers()
      headers.append('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPID_API_KEY as string)
      headers.append('X-RapidAPI-Host', 'genius-song-lyrics1.p.rapidapi.com')

      const options: RequestInit = {
        method: 'GET',
        headers: headers,
        cache: 'no-store'
      };

      // Get the Song ID of the first 9 search results of the input.
      fetch('https://genius-song-lyrics1.p.rapidapi.com/search/?q=' + input + '&per_page=9&page=1', options)
      .then(response => response.json())
      .then(data => {
        if(cancel === true) return
        else 
        setSearchResults(data['hits'])
        console.log('hi')
      })
      .catch(err => console.error(err))
    }

    return ()=>{cancel = true}
  }, [input])

  return (
    <>
      <Splash />
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
      <div style={{ marginBottom: '3rem' }}>
        <input
          name="search_input"
          className="prompt"
          id="search"
          onChange={handleInput}
          autoComplete="off"
        />
        <label htmlFor="search">
          <span>Search</span>
        </label>
      </div>
    </>
  )
}
