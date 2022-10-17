import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import getProduct from '../../redux/reducer/Products/Actions/getProduct'
import {Image} from "cloudinary-react"



export default function ProductDetail() {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const product = useAppSelector(state => state.Products.oneProduct)
    console.log(id)
    console.log(product)
    useEffect(() => {
      if(product.product_id) return 
      dispatch(getProduct(id))

    }, [])
    
    useEffect(()=>{
      
    },[])
    
    return (
      <div>
        <h1>{product?.name}</h1>
        <div >
          <div>
            <Image
              cloudName={`${process.env.REACT_APP_CLOUD_NAME}`}
              publicId={product.product_image}>
            </Image>
          </div>
          <div>
            <span>Presentation: </span>
            <span>{product.presentation}</span>
            
            <span>Price:</span>
            <span>{product.product_price}</span>
            
            <span>Stock:</span>
            <span>{product.stock}</span>
            
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
}
