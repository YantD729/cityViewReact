"use client"

import React, { useState } from 'react';
import './css/styles.css';
import Carousel from './components/Carousel/Carousel'
import SearchBar from './components/SearchBar/SearchBar'

export default function Home() {

  const [searchValue, setSearchValue] = useState('Beijing');

  return (
    <div>
      <SearchBar onSearch={(value) => {
        console.log("Received value from SearchBar: ", value)
        setSearchValue(value)
        }}/>
      <Carousel searchValue={searchValue}/> 
      {/* Your original code continues here... */}
    </div>
  );
}
