'use client'

import React, { useState } from 'react'

async function getSamples(search: String) {
  let songID: String = ''
  let samples: any[] = []

  let headers = new Headers()
  headers.append('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPID_API_KEY as string)
  headers.append('X-RapidAPI-Host', 'genius-song-lyrics1.p.rapidapi.com')

  const options: RequestInit = {
    method: 'GET',
    headers: headers,
  };


  // Get the Song ID of the first search result of the input.
  songID = await fetch('https://genius-song-lyrics1.p.rapidapi.com/search/?q=' + search + '&per_page=1&page=1', options)
    .then(response => response.json())
    .then(data => data['hits']['0']['result']['id'])
    .catch(err => console.error(err));


  // Get the samples used in a song with id of Song ID. 
  samples = await fetch('https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=' + songID, options)
    .then(response => response.json())
    .then(data => data['song']['song_relationships']['0']['songs'])
    .catch(err => console.error(err));

  console.log(samples)

  return samples as any[]
}

export default function SearchBar() {
  const [input, setInput] = useState("")

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && input.trim().length > 0) {
      getSamples(input)
    }
  }

  const handleInput = (e: any) => {
    setInput(e.target.value)
  }

  return (
    <input
      data-lpignore
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  )
}