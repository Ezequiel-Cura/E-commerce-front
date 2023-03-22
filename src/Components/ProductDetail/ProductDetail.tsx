import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import getProduct from '../../redux/reducer/Products/Actions/getProduct'
import {Image} from "cloudinary-react"
import styles from "./ProductDetail.module.css"


export default function ProductDetail() {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const product = useAppSelector(state => state.Products.oneProduct)
    
    console.log(product)
    useEffect(() => {
      if(product.product_id) return 
      dispatch(getProduct(id))

    }, [])
    
    
    
    return (
      <div className={styles.detail_wrapper}>
        <h1>{product?.name}</h1>
        <div className={styles.detail_properties}>
          <div className={styles.image_wrapper}>
            <Image
              cloudName={`${process.env.REACT_APP_CLOUD_NAME}`}
              publicId={product.product_image}>
            </Image>
          </div>
          <div className={styles.properties}>
            <div>
              <span>Presentacion: </span>
              <span>{product.presentation}</span>
            </div>
            
            <div>
              <span>Precio: </span>
              <span>${product.product_price}</span>
            </div>
            
            <div>
              <span>Stock: </span>
              <span>{product.stock}</span>
            </div>

            <div>
              <span>Categorias: </span>
              <span>{product.categories.join(" - ")}</span>
            </div>           

            <div>
              <span>Variantes: </span>
              <span>{product.variants.join(" - ")}</span>
            </div>
            
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
}
