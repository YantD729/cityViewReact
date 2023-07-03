import React, { useState } from 'react'
import '../css/styles.css'
import { useSelector } from 'react-redux'
import Carousel from './Carousel/Carousel'
import SearchBar from './SearchBar/SearchBar'
import ExportPDF from './ExportPDF/ExportPDF'

function Home() {
    const [searchValue, setSearchValue] = useState('Beijing')

    return (
    <div>
        <SearchBar onSearch={(value) => {
        console.log("Received value from SearchBar: ", value)
        setSearchValue(value)
        }}/>
        <Carousel searchValue={searchValue}/> 
        <ExportPDF/>
    </div>
    )
}

export default Home;
