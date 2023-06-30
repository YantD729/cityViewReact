"use client"
import React, { useEffect, useState, useRef } from 'react'
import './Carousel.css'
import axios from 'axios'
import { extractPage, changePageInLink} from './LinkHandler.js'

const myAPIKey = "6hL3QGStGy43v6iOg0fN92ZTQCWbcWuGuh0QwyeoC50"

function Carousel({ searchValue }) {
  const [picData, setPicData] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [currPageIndex, setCurrPageIndex] = useState(1)

  const maxPageNum = useRef(0)
  const currPageUrl = useRef('')

  useEffect(() => {
    console.log(picData)
    const backgroundImgUrl = picData[activeIndex]?.urls?.regular
    if (backgroundImgUrl) {
      document.documentElement.style.backgroundImage = `url(${backgroundImgUrl})`
    }
  }, [activeIndex, picData])
  

  useEffect(() => {
    console.log('Carousel received searchValue: ', searchValue)
    const searchPics = async () => {
      const response = await axios({
        method: 'get',
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchValue}&client_id=${myAPIKey}`,
      })
      console.log("we get into search pics")
      const links = response.headers.link
      currPageUrl.current = response.config.url
      maxPageNum.current = extractPage(links, "last")
      console.log("Setting picData from searchPics")
      setCurrPageIndex(1)
      setPicData(response.data.results)
    }
    searchPics()
  }, [searchValue])

  const handlePageChange = async (newPageIndex) => {
    setCurrPageIndex(newPageIndex);
    const newUrl = changePageInLink(currPageUrl.current, newPageIndex);
    const response = await axios({
      method: 'get',
      url: newUrl,
    })
    console.log("Setting picData from handlePageChange");
    setPicData(response.data.results)
    setActiveIndex(0)
  }

  return (
    <div className='imageBox'>
         <button 
          className="prev-btn" 
          data-carousel-button="prev"
          onClick={() => handlePageChange(currPageIndex > 1 ? currPageIndex - 1 : maxPageNum.current)}
         >
          &lt;
         </button>
         <div className="slides">
            {picData?.map((pic, index) => (
                <div
                key={index}
                className={`slide ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}>
                <img src={pic.urls.thumb} alt={pic.description} />
                </div>
            ))}
        </div>
        <button 
          className="next-btn" 
          data-carousel-button="next"
          //这个setCurrPageIdx也要改变activeIndex
          onClick={() => handlePageChange(currPageIndex < maxPageNum.current ? currPageIndex + 1 : 1)}
          >
          &gt;
        </button>
    </div>
  )
}

export default Carousel