"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeImage, resetImages } from '../../../../slices/imageSlice'
import jsPDF from 'jspdf'
import './ExportPDF.css'

function ExportPDF () {

    const dispatch = useDispatch()
    const selectedImages = useSelector(state => state.image.images)
    
    async function urlToBase64(url) {
        const response = await fetch(url)
        const blob = await response.blob()
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject;
          reader.readAsDataURL(blob)
        })
      }

    async function exportImages  () {
        const doc = new jsPDF()
        doc.setFont("courier", "normal"); 
        for (let image of selectedImages) {
            let base64Img = await urlToBase64(image.url)
            doc.addImage(base64Img, 'JPEG', 15, 40, 180, 160)
            doc.text(image.description || '', 15, 35)  
            doc.addPage()
        }
        doc.deletePage(doc.getNumberOfPages());
        doc.save('download.pdf')
    }

    const handleRemoveImage = (index) => {
        dispatch(removeImage(index));
    }

    const handleResetImages = () => {
        dispatch(resetImages());
    }

    return (
        <div className='exportImageBox bg-teal-100 bg-opacity-25 rounded-[8px] '>

            <div >
                <button className="group relative overflow-hidden rounded-lg bg-white text-base shadow px-[15px] py-[4px]"
                    onClick={exportImages}>
                    <div className="absolute inset-0 w-3 bg-teal-200 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative text-black group-hover:text-white">Export PDF</span>
                </button>
                <button class="bg-orange-100 hover:bg-orange-200 transition-colors rounded-[8px] px-[15px] py-[4px] text-white"
                    onClick={handleResetImages}>
                    Reset Images
                </button> 
            </div>
             
            <div className='slides'>
            {selectedImages.map((image, index) => (
                <img 
                key={index}
                src={image.url} 
                onClick={() => handleRemoveImage(index)} 
            />
            ))}
            </div>

        </div>
    )
}

export default ExportPDF