import React from 'react'
import {Image} from "cloudinary-react"



export default function ProductCard() {
  return (
    <div>
        <span>Name: {}</span>
        <span>Price: {}</span>
        <span></span>
        <span></span>
        <Image cloudName={`${process.env.REACT_APP_CLOUD_NAME}`}>
            
        </Image>
    </div>
  )
}
