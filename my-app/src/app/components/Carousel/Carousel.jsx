"use client"
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addImage } from '../../../../slices/imageSlice'
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

  const dispatch = useDispatch()

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
      const links = response.headers.link
      currPageUrl.current = response.config.url
      maxPageNum.current = extractPage(links, "last")
      setCurrPageIndex(1)
      setPicData(response.data.results)
    }
    searchPics()
  }, [searchValue])

  const handlePageChange = async (newPageIndex) => {
    setCurrPageIndex(newPageIndex);
    const newUrl = changePageInLink(currPageUrl.current, newPageIndex)
    const response = await axios({
      method: 'get',
      url: newUrl,
    })
    setPicData(response.data.results)
    setActiveIndex(0)
  }

  return (
    <div className='carousel justify-center items-center'>
       <div className='imageBox'>
        <button className="prevBtn inline-flex items-center px-2 py-1.5 bg-opacity-0" 
          onClick={() => handlePageChange(currPageIndex > 1 ? currPageIndex - 1 : maxPageNum.current)}>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
              <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z"/>
          </svg>
        </button>
         <div className="slides">
            {picData?.map((pic, index) => (
                <div
                key={index}
                className={`slide ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                onDoubleClick={() => dispatch(addImage({ 
                  url: pic.urls.regular, description: pic.description 
              }))}>
                <img src={pic.urls.thumb} alt={pic.description} />
                </div>
            ))}
        </div>
        <button 
          className="nextBtn inline-flex items-center px-2 py-1.5 bg-opacity-0" 
          onClick={() => handlePageChange(currPageIndex < maxPageNum.current ? currPageIndex + 1 : 1)}
          >
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
            <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"/>
          </svg>
        </button>
        
      </div>
      <div className='numberKeys inline-flex items-center justify-center'>
      {Array.from({ length: 10 }, (_, i) => (
        <kbd key={i} className="px-2 py-1.5 text-xs text-gray-800 bg-opacity-0">
          {i  + 1}
        </kbd>
      ))} 
      </div>
  </div>
   
  )
}

export default Carousel
