import React from 'react'
import {Image} from "cloudinary-react"
import { useAppSelector } from '../../redux/Hooks'




export default function ProductCard() {
    const product = useAppSelector(state => state.Products.oneProduct)



  return (
    <div>
        <span>Name: {product.name}</span>
        
        <Image cloudName={`${process.env.REACT_APP_CLOUD_NAME}`}
          publicId={product.product_image}
          >
            
        </Image>
    </div>
  )
}
