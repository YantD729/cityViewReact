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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.target.closest(".searchingBox") === null &&
        displayHistory
      ) {
        setDisplayHistory(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [displayHistory]);

  return (
    <form className='searchingBar' onSubmit={handleSubmit}>
      <div className='searchingBox rounded-full '>
        <input 
          className='block w-full p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500s'
          type="text" 
          placeholder="Type city names..." 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={() => setDisplayHistory(true)}
          />
        {displayHistory && 
          <ul className='searchHistory'>
            {filteredHistory.map((keyword, index) => (
              <li 
                key={index} 
                className='p-1'
                onClick={(e) => {
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
          type="submit" 
          class="left-2.5 right-2.5 bottom-2.5 bg-teal-200 hover:bg-amber-100 rounded-2xl px-2 py-2"
          onClick={(e) => handleSubmit(e)}>
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </button>
    </form>
  )
}

export default SearchBar
