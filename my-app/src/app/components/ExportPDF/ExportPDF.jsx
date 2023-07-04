"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeImage, resetImages } from '../../../../slices/imageSlice'
import Button from 'react-bootstrap/Button';
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
        <div className='exportImageBox'>

            <div className='buttonBox'>
                <Button variant="success">Success</Button>{' '}
                <button 
                    className=''
                    onClick={exportImages}>
                    Export PDF
                </button>
                <button onClick={handleResetImages}>
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