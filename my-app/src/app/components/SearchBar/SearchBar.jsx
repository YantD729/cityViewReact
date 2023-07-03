"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')
  const [searchHistory, setSearchHistory] = useState(
    typeof window !== 'undefined' && window.localStorage
      ? (JSON.parse(localStorage.getItem('searchHistory')) || [] )
      : []
  )
  const [filteredHistory, setFilteredHistory] = useState(searchHistory)
  const [displayHistory, setDisplayHistory] = useState(false)

  const debouncedFilterHistory = useCallback(
    debounce((value) => {
      const filtered = searchHistory.filter(keyword => keyword.includes(value))
      setFilteredHistory(filtered)
    }, 200),
    [searchHistory]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchValue.trim() !== '') { // 检查 searchValue 是否只包含空格
      onSearch(searchValue)
      if (!searchHistory.includes(searchValue)) {
        const updatedHistory = [...searchHistory, searchValue]
        if (updatedHistory.length > 10) {
          updatedHistory.shift()
        }
        setSearchHistory(updatedHistory)
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
      }
    }
    setDisplayHistory(false)
  }
  

  useEffect(() => {
    debouncedFilterHistory(searchValue);
  }, [searchValue]);

  
  return (
    <form onSubmit={handleSubmit}>
      <div className='searchingBox'>
        <input 
          type="text" 
          placeholder="Type city names..." 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={() => setDisplayHistory(true)}
          />
        {displayHistory && 
          <ul className='searchHistory'>
            {filteredHistory.map((keyword, index) => (
              <li key={index} onClick={(e) => {
                setSearchValue(keyword)
                handleSubmit(e)
              }}
              >
                {keyword}
              </li>
            ))}
          </ul>
        }
      </div>
       
        <button
          type='submit'
          onClick={(e) => handleSubmit(e)}>
            Search
        </button>
    </form>
  )
}

export default SearchBar
