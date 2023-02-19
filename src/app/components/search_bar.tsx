'use client'

import React, { useState } from 'react'
import '../styles/searchbar.css'

export default function SearchBar(props: any) {
  const [input, setInput] = useState("")

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && input.trim().length > 0) {
      props.getSamples(input)
    }
  }

  const handleInput = (e: any) => {
    setInput(e.target.value)
  }

  return (
    <>
      <input
        name="search_input"
        className="prompt"
        id="search"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <label htmlFor="search">
        <span>Search</span>
      </label>
    </>
  )
}