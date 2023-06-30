"use client"

import React, { useState, useCallback } from 'react'
import { debounce } from 'lodash'
import './SearchBar.css'

// import { Roboto_Mono } from 'next/font/google'
 
// const robotoMono =Roboto_Mono({ subsets: ['latin'] })

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const debouncedSetSearchValue = useCallback(
    debounce(val => setSearchValue(val), 500),
    [onSearch]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchValue)
    console.log("handling submit", searchValue)
    // updateSearchHistory(searchValue)
  }
  
  return (
    <form className='searchingBox' onSubmit={handleSubmit}>
      <div>
        <input 
          type="text" 
          placeholder="Type city names..." 
          onChange={(e) => debouncedSetSearchValue(e.target.value)}
          />
        <button className='searchButton'
          type='submit'
          onClick={(e) => handleSubmit(e)}>
            Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
