import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import getAllProducts from '../../redux/reducer/Products/Actions/getAllProducts'
import {Image} from "cloudinary-react"
import styles from "./Products.module.css"

export default function Products() {
  const dispatch = useAppDispatch()
  const allProducts = useAppSelector((state)=> state.Products)

  useEffect(()=>{
    dispatch(getAllProducts())
  },[])

  return (
    <div>
      <h5>Products</h5>
      <Link to="/createProduct">
        <span>Create a product</span>
      </Link>
      <div className={styles.products_wrapper}>
        {allProducts.Products.map((p,i)=>(
          <div className={styles.products_cointainer} key={p.product_id}>
            <span>#{p.product_id} </span>
            <span>Name: {p.name}</span>
            <span>Price: {p.product_price}</span>
            <span>Stock: {p.stock} </span>
            <span>Presentation:{p.presentation} </span>
            <Image cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} publicId={p.product_image}>

            </Image>
          </div>
        ))}
      </div>
    </div>
  )
}
